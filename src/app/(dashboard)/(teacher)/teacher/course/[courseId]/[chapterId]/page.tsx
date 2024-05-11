import { IconBadge } from "@/components/custom/icon-badge";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";

const ChapterPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const currentUser = await CurrentUser();
  const userRole = await CurrentUserRole();
  if (userRole !== "TEACHER") {
    return redirect("/");
  }
  const ownerCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: currentUser?.id,
    },
  });
  if (!ownerCourse) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) {
    return redirect("/");
  }
  const requiredFields = [chapter.description, chapter.title, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const compleatedFields = requiredFields.filter(Boolean).length;
  const compleatedNumber = `(${compleatedFields}/${totalFields})`;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-medium">Chapter Setup</h2>
        <p className="text-sm text-foreground">
          Complete Filed {compleatedNumber}
        </p>
      </div>
      <div className="grid md:grid-cols-2 pt-10 gap-5">
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="font-[500]">Customize your Chapter</h2>
          </div>
          <div className="p-5 bg-slate-200">
            <ChapterTitleForm initialData={chapter} />
          </div>
          <div className="p-5 bg-slate-200">
            <ChapterDescriptionForm initialData={chapter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
