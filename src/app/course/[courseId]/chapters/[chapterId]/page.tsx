import { UserChapterAction } from "@/actions/user/user-chapter-action";
import { Banner } from "@/components/custom/banner";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

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
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgres?.isCompleted;
  return (
    <div>
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
  );
};

export default ChapterId;
