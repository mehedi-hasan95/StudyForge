import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { Attachment, Chapter } from "@prisma/client";

export const UserChapterAction = async (
  courseId: string,
  chapterId: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id as string;
    // Purchase course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    // chapter
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: { price: true },
    });
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
    if (!chapter || !course) {
      return { error: "Course of Chapter not found" };
    }
    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId,
        },
      });
    }
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });
    }
    nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });
    const userProgres = await db.userProgres.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });
    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgres,
      purchase,
    };
  } catch (error) {
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgres: null,
      purchase: null,
    };
  }
};
