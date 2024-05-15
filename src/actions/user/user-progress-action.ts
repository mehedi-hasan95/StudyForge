import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";

export const UserProgressAction = async (courseId: string): Promise<number> => {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id;
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = await db.userProgres.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;
    return progressPercentage;
  } catch (error) {
    return 0;
  }
};
