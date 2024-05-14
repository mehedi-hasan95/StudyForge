"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AdminCategorySchema } from "@/schema/admin/admin-schema";
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
import { FileUpload } from "@/lib/file-upload";
import { useState, useTransition } from "react";
import {
  AdminCategoryAction,
  UpdateCategoryAction,
} from "@/actions/admin/admin-category-action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category } from "@prisma/client";

interface Props {
  initialData: Category | null;
}
export const AdminCategoryForm = ({ initialData }: Props) => {
  const [isImage, setIsImage] = useState<string | undefined>(undefined);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof AdminCategorySchema>>({
    resolver: zodResolver(AdminCategorySchema),
    defaultValues: {
      title: initialData?.title || "",
      catImage: initialData?.catImage || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AdminCategorySchema>) {
    startTransition(() => {
      {
        initialData
          ? UpdateCategoryAction(values, initialData.id).then((data) => {
              if (data.success) {
                toast.success(data.success);
                router.push("/category");
              } else {
                toast.error(data.error);
              }
            })
          : AdminCategoryAction(values).then((data) => {
              if (data.success) {
                toast.success(data.success);
                router.push("/category");
              } else {
                toast.error(data.error);
              }
            });
      }
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
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Web Development"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isImage && <Image src={isImage} alt="" height={120} width={120} />}
          <FormField
            control={form.control}
            name="catImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <FileUpload
                    endPoint="courseImage"
                    onChange={(url) => field.onChange(url)}
                    values={setIsImage(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <Button disabled>
              Creating <Loader2 className="h-4 w-4 animate-spin ml-2" />
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
