"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  File,
  ImageIcon,
  Loader2,
  Paperclip,
  Pencil,
  PlusCircle,
  X,
} from "lucide-react";
import { useState, useTransition } from "react";
import {
  CourseAttachmentSchema,
  CourseSchema,
} from "@/schema/teacher/course-schema";
import { useRouter } from "next/navigation";
import {
  CourseAttachmentAction,
  CourseAttachmentDeleteAction,
  CourseEditAction,
} from "@/actions/teacher/course-action";
import { toast } from "sonner";
import { IconBadge } from "@/components/custom/icon-badge";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/lib/file-upload";
import Image from "next/image";

interface Props {
  initialData: Course & { attachment: Attachment[] };
}
export const CourseAttachmentsForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseAttachmentSchema>) {
    startTransition(() => {
      CourseAttachmentAction(values, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Course Attachment Updated");
        } else {
          toast.error(data.error);
        }
      });
    });
  }

  const attachmentDelete = (id: string) => {
    startTransition(() => {
      CourseAttachmentDeleteAction(initialData.id, id).then((data) => {
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
          <h4 className="text-md font-semibold">Course Attachments</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Attachments
            </>
          )}
        </Button>
      </div>
      {!isEditing && initialData?.attachment?.length === 0 && "No Attachments"}
      {!isEditing && initialData?.attachment?.length > 0 && (
        <div className="space-y-2">
          {initialData?.attachment.map((item) => (
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
