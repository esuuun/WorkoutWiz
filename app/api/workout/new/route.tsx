import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

    const body = await req.json();
    const { title, progress, days } = body;

    if (!title || !days || !Array.isArray(days)) {
      return new NextResponse("Missing required fields or invalid format!", { status: 400 });
    }

    const createNewWorkout = await db.workout.create({
      data: {
        userId: userId,
        title: title,
        progress: progress || 0, 
        days: {
          create: days.map((day: any) => ({
            dayNumber: day.dayNumber,
            exercises: {
              create: day.exercises.map((exercise: any) => ({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
              })),
            },
          })),
        },
      },
      include: {
        days: {
          include: {
            exercises: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return NextResponse.json(createNewWorkout, { status: 200 });
  } catch (error) {
    console.error("Error creating new workout:", error);
    
    if (error instanceof Error) {
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }

    // Handle unexpected error objects
    return new NextResponse("Error creating new workout. Please try again later.", { status: 500 });
  }
}
