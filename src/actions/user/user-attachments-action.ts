import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";

export const UserAttachmentAndDesc = async (
  courseId: string,
  chapterId: string
) => {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id as string;
    console.log(userId);
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          courseId,
          userId,
        },
      },
    });
    if (!purchase) {
      return {
        attachAndDesc: [],
      };
    }
    const attachments = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
      select: {
        description: true,
        chapterAttachment: true,
      },
    });
    return { attachments };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
