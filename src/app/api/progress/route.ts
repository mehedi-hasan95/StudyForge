import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id;
    if (!userId) {
      return new NextResponse("Unauthorize user", { status: 401 });
    }
    const { courseId, chapterId, isCompleted } = await req.json();
    const userProgress = await db.userProgres.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
    });
    return NextResponse.json(userProgress);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
