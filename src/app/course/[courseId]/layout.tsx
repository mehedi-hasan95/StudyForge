import { UserProgressAction } from "@/actions/user/user-progress-action";
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { redirect } from "next/navigation";
import { CourseSidebar } from "../_components/course-sidebar";
import { UserInfo } from "@/components/custom/user-info";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/common/logo";
import { MobileCourseSidebar } from "../_components/mobile-course-sidebar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const currentUser = await CurrentUser();
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        include: {
          userProgres: {
            where: {
              userId: currentUser?.id,
            },
          },
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
  const userProgress = await UserProgressAction(course.id);
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-[49] bg-white">
        <div className="flex justify-between items-center p-4">
          <div className="md:hidden">
            <MobileCourseSidebar course={course} progressCount={userProgress} />
          </div>
          <Logo />
          <UserInfo />
        </div>
        <Separator />
      </div>
      <div className="hidden md:flex flex-col w-72 fixed inset-y-0 z-[48]">
        <CourseSidebar course={course} progressCount={userProgress} />
      </div>
      <main className="md:pl-72 pt-20 h-full">
        <div className="p-4 max-w-screen-xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default CourseLayout;
