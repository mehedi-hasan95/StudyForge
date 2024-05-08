"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ListTodo, Pencil, PlusCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { CourseSchema } from "@/schema/teacher/course-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { CourseEditAction } from "@/actions/teacher/course-action";
import { toast } from "sonner";
import { DisableButton } from "@/components/custom/disable-button";
import { IconBadge } from "@/components/custom/icon-badge";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/custom/combobox";

interface Props {
  initialData: Course;
  optoins: { label: string; value: string }[];
}
export const CourseCategoryForm = ({ initialData, optoins }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseSchema>) {
    startTransition(() => {
      CourseEditAction(values, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Course Category Updated");
        } else {
          toast.error(data.error);
        }
      });
    });
  }
  const selectedCategory = optoins.find(
    (option) => option.value === initialData?.categoryId
  );
  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={ListTodo} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Course Category</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && "Cancle"}{" "}
          {!isEditing && initialData?.categoryId && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Category
            </>
          )}
          {!isEditing && !initialData?.categoryId && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox optoins={optoins} {...field} />
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
        <p
          className={cn(
            "text-sm text-slate-700",
            !initialData.categoryId && "italic text-slate-500"
          )}
        >
          {selectedCategory?.label || "No Category"}
        </p>
      )}
    </div>
  );
};
