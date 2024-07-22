import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

    const { workoutId } = await req.json();

    if (!workoutId) {
      return new NextResponse("Workout ID not provided!", { status: 400 });
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
        "Workout not found or you are not authorized to delete it!",
        { status: 404 }
      );
    }

    // Delete the workout
    await db.workout.delete({
      where: {
        id: workoutId,
      },
    });

    revalidatePath("/dashboard");
    return new NextResponse("Workout deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return new NextResponse("Error deleting workout. Please try again later.", {
      status: 500,
    });
  }
}
