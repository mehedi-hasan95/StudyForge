"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { CourseTitleSchema } from "@/schema/teacher/course";
import { useTransition } from "react";
import { CreateCourseTitleAction } from "@/actions/teacher/course-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const CreateCourse = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourseTitleSchema>>({
    resolver: zodResolver(CourseTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourseTitleSchema>) {
    startTransition(() => {
      CreateCourseTitleAction(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push(`/teacher/course/${data.id}`);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Web Development"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your Course Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <Button disabled>
              Creating <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">Create</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
