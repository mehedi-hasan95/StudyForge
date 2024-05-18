import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { Chapter, Course, UserProgres } from "@prisma/client";
import { ChapterItems } from "./chapter-items";

interface Props {
  course: Course & {
    chapter: (Chapter & {
      userProgres: UserProgres[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseSidebar = async ({ course, progressCount }: Props) => {
  const currentUser = await CurrentUser();
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: currentUser?.id as string,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm md:pt-24">
      <div className="flex flex-col border-b px-8 py-[22px]">
        <h1 className="font-semibold text-lg">{course.title}</h1>
        {/* Todo: User progress */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapter.map((chapter) => (
          <ChapterItems
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            isCompleted={!!chapter.userProgres?.[0]?.isCompleted}
            courseId={chapter.courseId}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
