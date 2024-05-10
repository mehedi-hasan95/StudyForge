"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { List, Loader2, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { CourseChapterSchema } from "@/schema/teacher/course-schema";
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
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  CreateChapterAction,
  CreateChapterUpdateAction,
} from "@/actions/teacher/chapter-action";
import { CourseChapterDetailsForm } from "./course-chapter-details-form";

interface Props {
  initialData: Course & { chapter: Chapter[] };
}
export const CourseChapterForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseChapterSchema>>({
    resolver: zodResolver(CourseChapterSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseChapterSchema>) {
    startTransition(() => {
      CreateChapterAction(values, initialData.id).then((data) => {
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

  const onReorder = async (updatedData: { id: string; position: string }[]) => {
    startTransition(() => {
      CreateChapterUpdateAction(updatedData, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success(data.success);
        } else {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className="relative">
      {isPending && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={List} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Course Chapter</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Chapter
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g. Course Chapter Name"
                      {...field}
                    />
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
      ) : (
        <div>
          {initialData.chapter.length ? (
            <CourseChapterDetailsForm
              items={initialData.chapter || []}
              onEdit={() => {}}
              onReorder={onReorder as any}
            />
          ) : (
            <p className="text-sm text-slate-500 italic">No Chapter</p>
          )}
        </div>
      )}
      {!isEditing && (
        <p className="pt-2">Drag and droup for reorder the chapter</p>
      )}
    </div>
  );
};
