import { IconBadge } from "@/components/custom/icon-badge";
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { BookOpen, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseTitleForm } from "./_components/course-title-form";
import { CourseDescriptionForm } from "./_components/course-description-form";
import { CourseImageForm } from "./_components/course-image-form";
import { CourseCategoryForm } from "./_components/course-category-form";
import { CoursePriceForm } from "./_components/course-price-form";
import { CourseAttachmentsForm } from "./_components/course-attachments-form";
import { CourseChapterForm } from "./_components/course-chapter-form";
import { CoursePublish } from "./course-publish";
import { Banner } from "@/components/custom/banner";

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachment: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapter: {
        orderBy: {
          position: "asc",
        },
      },
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
    course.chapter.some((item) => item.isPublished),
  ];
  const totalFields = requiredFields.length;
  const compleatedFields = requiredFields.filter(Boolean).length;
  const compleatedNumber = `(${compleatedFields}/${totalFields})`;
  const isCompleate = requiredFields.every(Boolean);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {!course.isPublished && (
        <Banner
          label="This course is unpublish. User can't watch this"
          variant={"warning"}
        />
      )}
      {course.isPublished && (
        <Banner
          label="This course is publish. User can watch this"
          variant={"success"}
        />
      )}
      <div className="flex justify-between pt-4">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-medium">Course Setup</h2>
          <p className="text-sm text-foreground">
            Complete Filed {compleatedNumber}
          </p>
        </div>
        <CoursePublish
          courseId={course.id}
          disabled={!isCompleate}
          isPublished={course.isPublished}
        />
      </div>
      <div className="grid md:grid-cols-2 pt-16 gap-5">
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="font-[500]">Customize your Course</h2>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-slate-200">
              <CourseTitleForm initialData={course} />
            </div>
            <div className="p-5 bg-slate-200">
              <CourseDescriptionForm initialData={course} />
            </div>
            <div className="p-5 bg-slate-200">
              <CourseImageForm initialData={course} />
            </div>
            <div className="p-5 bg-slate-200">
              <CourseCategoryForm
                initialData={course}
                optoins={courseCategory.map((cat) => ({
                  label: cat.title,
                  value: cat.id,
                }))}
              />
            </div>
            <div className="p-5 bg-slate-200">
              <CoursePriceForm initialData={course} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={BookOpen} />
            <h2 className="font-[500]">Course Chapter & Attachments</h2>
          </div>
          <div className="p-5 bg-slate-200">
            <CourseChapterForm initialData={course} />
          </div>
          <div className="p-5 bg-slate-200">
            <CourseAttachmentsForm initialData={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseId;
