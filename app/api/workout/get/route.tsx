import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated!", { status: 401 });
    }

    
    const userWorkout = await db.workout.findMany({
      where: {
        userId: userId,
        
      },
      include: {
        days: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(userWorkout, { status: 200 });
  } catch (error) {
    console.error("GET WORKOUT ERROR:", error);
    return new NextResponse("GET WORKOUT ERROR", { status: 500 });
  }
}
