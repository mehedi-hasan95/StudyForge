import { IconBadge } from "@/components/custom/icon-badge";
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseTitleForm } from "./_components/course-title-form";
import { CourseDescriptionForm } from "./_components/course-description-form";
import { CourseImageForm } from "./_components/course-image-form";
import { CourseCategoryForm } from "./_components/course-category-form";

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) {
    return redirect("/");
  }
  const courseCategory = await db.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
  ];
  const totalFields = requiredFields.length;
  const compleatedFields = requiredFields.filter(Boolean).length;
  const compleatedNumber = `(${compleatedFields}/${totalFields})`;
  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-medium">Course Setup</h2>
        <p className="text-sm text-foreground">
          Complete Filed {compleatedNumber}
        </p>
      </div>
      <div className="grid md:grid-cols-2 pt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="font-[500]">Customize your Course</h2>
          </div>
          <div>
            <div className="mt-5 p-5 bg-slate-200">
              <CourseTitleForm initialData={course} />
            </div>
            <div className="mt-5 p-5 bg-slate-200">
              <CourseDescriptionForm initialData={course} />
            </div>
            <div className="mt-5 p-5 bg-slate-200">
              <CourseImageForm initialData={course} />
            </div>
            <div className="mt-5 p-5 bg-slate-200">
              <CourseCategoryForm
                initialData={course}
                optoins={courseCategory.map((cat) => ({
                  label: cat.title,
                  value: cat.id,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseId;
