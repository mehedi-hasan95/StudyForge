"use client";

import { DeleteChapterUpdateAction } from "@/actions/teacher/chapter-action";
import { AlertDialogDemo } from "@/components/custom/confirm-modal";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}
export const ChapterPublish = ({
  chapterId,
  courseId,
  disabled,
  isPublished,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const deleteChapter = () => {
    setIsLoading(true);

    DeleteChapterUpdateAction(courseId, chapterId)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push(`/teacher/course/${courseId}`);
        }
        if (data.error) {
          toast.error(data.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error deleting chapter");
      });
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled}
        onClick={() => {}}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <AlertDialogDemo onConfirm={deleteChapter}>
        {isLoading ? (
          <Button disabled size={"sm"}>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button size={"sm"}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogDemo>
    </div>
  );
};
