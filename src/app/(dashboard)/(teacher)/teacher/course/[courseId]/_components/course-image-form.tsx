"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { CourseSchema } from "@/schema/teacher/course-schema";
import { useRouter } from "next/navigation";
import { CourseEditAction } from "@/actions/teacher/course-action";
import { toast } from "sonner";
import { IconBadge } from "@/components/custom/icon-badge";
import { Course } from "@prisma/client";
import { FileUpload } from "@/lib/file-upload";
import Image from "next/image";

interface Props {
  initialData: Course;
}
export const CourseImageForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseSchema>) {
    startTransition(() => {
      CourseEditAction(values, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Course Description Updated");
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
          <IconBadge icon={ImageIcon} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Course Image</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && "Cancle"}{" "}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Image
            </>
          )}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex justify-center items-center h-60 bg-slate-300">
            <ImageIcon className="h-10 w-10" />
          </div>
        ) : (
          <div className="aspect-video relative">
            <Image
              src={initialData.imageUrl}
              alt=""
              className="object-cover"
              fill
            />
          </div>
        ))}
      {isEditing && (
        <FileUpload
          endPoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      )}
    </div>
  );
};
