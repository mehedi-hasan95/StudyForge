import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { Category, Course } from "@prisma/client";
import { UserProgressAction } from "./user-progress-action";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export const UserCoursesAction = async ({
  categoryId,
  title,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const currentUser = await CurrentUser();
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId: currentUser?.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const couresWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchase.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await UserProgressAction(course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return couresWithProgress;
  } catch (error) {
    return [];
  }
};
