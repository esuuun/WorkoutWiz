import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

    const { workoutId, newTitle } = await req.json();

    if (!workoutId || !newTitle ) {
      return new NextResponse("Workout ID and new title must be provided!", { status: 400 });
    }

    // Check if the workout belongs to the authenticated user
    const workout = await db.workout.findFirst({
      where: {
        id: workoutId,
        userId: userId,
      },
    });

    if (!workout) {
      return new NextResponse(
        "Workout not found or you are not authorized to rename it!",
        { status: 404 }
      );
    }

    // rename
    await db.workout.update({
      where: {
        id: workoutId,
        },
        data: {
            title:newTitle,
        }
    });

    revalidatePath("/dashboard");
    return new NextResponse("Workout renamed successfully", { status: 200 });
  } catch (error) {
    console.error("Error renaming workout:", error);
    return new NextResponse("Error renaming workout. Please try again later.", {
      status: 500,
    });
  }
}
