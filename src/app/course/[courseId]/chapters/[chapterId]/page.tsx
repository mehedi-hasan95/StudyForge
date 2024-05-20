import { UserChapterAction } from "@/actions/user/user-chapter-action";
import { Banner } from "@/components/custom/banner";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CoursePurchase } from "./_components/course-purchase";
import { CourseProgressButton } from "./_components/course-progress-button";
import Link from "next/link";
import { UserAttachmentAndDesc } from "@/actions/user/user-attachments-action";
import { Preview } from "@/app/(dashboard)/(teacher)/teacher/course/[courseId]/[chapterId]/_components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import { IconBadge } from "@/components/custom/icon-badge";

const ChapterId = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgres,
    purchase,
  } = await UserChapterAction(params.courseId, params.chapterId);
  if (!chapter || !course) {
    return redirect("/");
  }
  const { attachments: chapterAttachments } = await UserAttachmentAndDesc(
    params.courseId,
    params.chapterId
  );
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgres?.isCompleted;
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {userProgres?.isCompleted && (
        <Banner
          label="You already completed this chapter"
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant={"warning"}
        />
      )}
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-lg font-bold">{chapter.title}</h2>

        {purchase ? (
          <CourseProgressButton
            chapterId={params.chapterId}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isCompleted={!!userProgres?.isCompleted}
          />
        ) : (
          <CoursePurchase courseId={params.courseId} price={course.price!} />
        )}
      </div>
      {chapterAttachments !== undefined && (
        <>
          <Separator className="my-5" />
          {/* Chapter Description  */}
          <div className="">
            <h2 className="text-xl font-bold">Chapter Description:</h2>
            <Preview value={chapterAttachments?.description!} />
          </div>
          {/* Chapter Attachments  */}
          {chapterAttachments?.chapterAttachment?.length !== 0 && (
            <div>
              <Separator className="my-5" />
              <h2 className="text-xl font-bold pb-4">Chapter Attachments</h2>
              {chapterAttachments?.chapterAttachment.map((item) => (
                <div className="flex gap-x-1 items-center" key={item.id}>
                  {" "}
                  <IconBadge icon={File} size={"sm"} />
                  <Link href={item.url}>{item.title}</Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChapterId;
