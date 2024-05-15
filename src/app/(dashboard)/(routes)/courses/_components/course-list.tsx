import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseProgressProps = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};
interface Props {
  courses: CourseProgressProps[];
}

export const CourseList = async ({ courses }: Props) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            category={course?.category?.title!}
            chaptersLength={course?.chapter?.length}
            imageUrl={course?.imageUrl!}
            price={course?.price!}
            progress={course?.progress}
            title={course?.title}
          />
        ))}
      </div>
      {courses.length === 0 && (
        <p className="text-center text-md text-muted-foreground mt-20">
          No Course found
        </p>
      )}
    </div>
  );
};
