"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ALargeSmall, Eye, Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { ChapterSchema, CourseSchema } from "@/schema/teacher/course-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DisableButton } from "@/components/custom/disable-button";
import { IconBadge } from "@/components/custom/icon-badge";
import { UpdateChapterUpdateAction } from "@/actions/teacher/chapter-action";
import { Chapter } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Props {
  initialData: Chapter;
}
export const ChapterPreviewForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
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
          toast.success("Chapter preview update successfully");
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
          <IconBadge icon={Eye} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Chapter Access</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Access
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4 rounded-lg border p-4">
                  <FormControl>
                    <Switch
                      className={cn(
                        "!bg-gray-600",
                        field.value === true && "!bg-red-400"
                      )}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Access Control</FormLabel>
                    <FormDescription>Is it free or paid?</FormDescription>
                  </div>
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
      {!isEditing &&
        (initialData.isFree ? (
          <p>This chapter is Free</p>
        ) : (
          <p>This chapter is Paid</p>
        ))}
    </div>
  );
};
