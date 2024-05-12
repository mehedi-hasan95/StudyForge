"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BookOpen, Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DisableButton } from "@/components/custom/disable-button";
import { IconBadge } from "@/components/custom/icon-badge";
import { UpdateChapterUpdateAction } from "@/actions/teacher/chapter-action";
import { Chapter } from "@prisma/client";
import { Editor } from "./editor";
import { Preview } from "./preview";

interface Props {
  initialData: Chapter;
}

const CourseSchema = z.object({
  description: z.string().min(2),
});
export const ChapterDescriptionForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseSchema>) {
    startTransition(() => {
      UpdateChapterUpdateAction(
        values,
        initialData.id,
        initialData.courseId
      ).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Chapter Description update successfully");
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
          <IconBadge icon={BookOpen} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Chapter Title</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <DisableButton label="Updating" />
            ) : (
              <Button type="submit">Update</Button>
            )}
          </form>
        </Form>
      )}
      {!isEditing && !initialData.description && (
        <p className="text-slate-500 text-sm italic">No Description</p>
      )}
      {!isEditing && initialData.description && (
        <Preview value={initialData?.description as string} />
      )}
    </div>
  );
};
