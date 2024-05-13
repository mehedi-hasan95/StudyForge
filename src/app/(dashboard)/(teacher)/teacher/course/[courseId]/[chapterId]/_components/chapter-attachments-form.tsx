"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { File, Loader2, Paperclip, Pencil, X } from "lucide-react";
import { useState, useTransition } from "react";
import { ChapterAttachmentSchema } from "@/schema/teacher/course-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconBadge } from "@/components/custom/icon-badge";
import { Chapter, ChapterAttachment } from "@prisma/client";
import { FileUpload } from "@/lib/file-upload";
import {
  ChapterAttachmentAction,
  ChapterAttachmentDeleteAction,
} from "@/actions/teacher/chapter-action";

interface Props {
  initialData: Chapter & { chapterAttachment: ChapterAttachment[] };
}
export const ChapterAttachmentsForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ChapterAttachmentSchema>) {
    startTransition(() => {
      ChapterAttachmentAction(values, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success(data.success);
        } else {
          toast.error(data.error);
        }
      });
    });
  }

  const attachmentDelete = (id: string) => {
    startTransition(() => {
      ChapterAttachmentDeleteAction(initialData.id, id).then((data) => {
        if (data.success) {
          setIsDeleting(id);
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Paperclip} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Chapter Attachments</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <p className="flex gap-2 items-center">
              <Pencil className="h-4 w-4" />
              Edit Attachments
            </p>
          )}
        </Button>
      </div>
      {!isEditing && !initialData?.chapterAttachment?.length && (
        <p className="text-slate-500 text-sm italic">No Attachments</p>
      )}
      {!isEditing && initialData?.chapterAttachment?.length > 0 && (
        <div className="space-y-2">
          {initialData?.chapterAttachment.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 items-center text-sky-700 font-[500] border border-sky-400 p-2 rounded-md"
            >
              <File className="h-4 w-4 line-clamp-1" /> {item.title}
              {isDeleting === item.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin" />
              )}
              {isDeleting !== item.id && (
                <div className="ml-auto">
                  <Button
                    onClick={() => attachmentDelete(item.id)}
                    variant={"ghost"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <FileUpload
          endPoint="courseAttachment"
          onChange={(url) => {
            if (url) {
              onSubmit({ url: url });
            }
          }}
        />
      )}
    </div>
  );
};
