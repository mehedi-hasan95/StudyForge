import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { CourseData } from "./_components/course-data";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { Separator } from "@/components/ui/separator";

const TeacherPage = async () => {
  const currentUser = await CurrentUser();
  const userRole = await CurrentUserRole();
  if (userRole !== "TEACHER") {
    return { error: "Unauthorize user" };
  }
  const data = await db.course.findMany({
    where: {
      userId: currentUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatCourse = data.map((course) => ({
    id: course.id,
    title: course.title,
    price: course.price!,
    isPublished: course.isPublished,
    createdAt: format(course.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Total Course ({data?.length})</h2>
        <Link href={"/teacher/course"}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <CourseData data={formatCourse} />
    </div>
  );
};

export default TeacherPage;
