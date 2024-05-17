import { db } from "@/lib/prismaDb";
import { redirect } from "next/navigation";

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  return redirect(`/course/${course.id}/chapters/${course?.chapter[0]?.id}`);
};

export default CourseId;
