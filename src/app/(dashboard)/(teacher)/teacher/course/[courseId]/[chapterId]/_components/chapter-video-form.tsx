"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState, useTransition } from "react";
import { ChapterSchema } from "@/schema/teacher/course-schema";
import MuxPlayer from "@mux/mux-player-react";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DisableButton } from "@/components/custom/disable-button";
import { IconBadge } from "@/components/custom/icon-badge";
import { UpdateChapterUpdateAction } from "@/actions/teacher/chapter-action";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/lib/file-upload";

interface Props {
  initialData: Chapter & { muxData: MuxData | null };
}
export const ChapterVideoForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    defaultValues: {
      videoUrl: initialData.title,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ChapterSchema>) {
    startTransition(() => {
      UpdateChapterUpdateAction(
        values,
        initialData.id,
        initialData.courseId
      ).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Chapter video uploaded");
        } else {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Video} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Chapter Video</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && "Cancle"}{" "}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Image
            </>
          )}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex justify-center items-center h-60 bg-slate-300">
            <Video className="h-10 w-10" />
          </div>
        ) : (
          <div className="aspect-video relative">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <>
          <FileUpload
            endPoint="courseVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <p className="text-muted-foreground text-sm pt-2">
            Upload this chapter video
          </p>
        </>
      )}
    </div>
  );
};
