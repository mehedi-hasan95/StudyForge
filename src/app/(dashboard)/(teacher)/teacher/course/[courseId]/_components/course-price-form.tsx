"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DollarSign, Pencil, PlusCircle, TextSelect } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { FormatPrice } from "@/lib/format";

interface Props {
  initialData: Course;
}
export const CoursePriceForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseSchema>) {
    startTransition(() => {
      CourseEditAction(values, initialData.id).then((data) => {
        if (data.success) {
          router.refresh();
          setIsEditing(false);
          toast.success("Course Price Updated");
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
          <IconBadge icon={DollarSign} size={"sm"} />{" "}
          <h4 className="text-md font-semibold">Course Price</h4>
        </div>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancle"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="$10"
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
        <p
          className={cn(
            "text-sm text-slate-700",
            !initialData.price && "italic text-slate-500"
          )}
        >
          {initialData.price ? FormatPrice(initialData.price) : "No Price"}
        </p>
      )}
    </div>
  );
};
