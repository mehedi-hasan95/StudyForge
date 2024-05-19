import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { Category, Chapter, Course } from "@prisma/client";
import { UserProgressAction } from "./user-progress-action";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapter: Chapter[];
  progress: number | null;
};
type Props = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const UserDashboardAction = async (): Promise<Props> => {
  try {
    const currentUser = await CurrentUser();
    const purchaseCource = await db.purchase.findMany({
      where: {
        userId: currentUser?.id,
      },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });
    const courses = purchaseCource.map(
      (course) => course.course
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await UserProgressAction(course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => course.progress !== 100
    );
    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
