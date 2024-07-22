import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

interface Exercise {
  id: string;
  completed: boolean;
}

interface Day {
  id: string;
  dayNumber: number;
  exercises: Exercise[];
}

export  async function GET(req: Request   , context : any) {
  const {params} = context

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

      const workout = await db.workout.findUnique({
        where: {
          id: params.workoutId,
        },
        include: {
          days: {
            include: {
              exercises: true,
            },
          },
        },
      });

      if (!workout) {
        return new NextResponse("Workout not found!", { status: 404 });
      }

    return NextResponse.json(workout, { status: 200 });

  } catch (error) {
    console.error("WORKOUT ERROR:", error);
    return new NextResponse("GET WORKOUT ERROR", { status: 500 });
  }
}

export async function POST(req: Request, context: any) {
  const { params } = context;

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

    const body = await req.json();
    const { progress , days }:{ progress: number, days: Day[] } = body;

    
    const updatedWorkout = await db.workout.update({
      where: {
        id: params.workoutId,
      },
      data: {
        progress: progress,
        days: {
          update: days.map((day) => ({
            where: { id: day.id },
            data: {
              dayNumber: day.dayNumber,
              exercises: {
                update: day.exercises.map((exercise) => ({
                  where: { id: exercise.id },
                  data: {
                    completed: exercise.completed,
                  },
                })),
              },
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

    if (!updatedWorkout) {
      return new NextResponse("Workout not found!", { status: 404 });
    }

    return NextResponse.json(updatedWorkout, { status: 200 });

  } catch (error) {
    console.error("WORKOUT ERROR:", error);
    return new NextResponse("Update Workout Error", { status: 500 });
  }
}