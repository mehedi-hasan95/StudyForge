"use client";

import {
  CourseDeleteAction,
  CoursePublishAction,
  CourseUnpublishAction,
} from "@/actions/teacher/course-action";
import { AlertDialogDemo } from "@/components/custom/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}
export const CoursePublish = ({ courseId, disabled, isPublished }: Props) => {
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const deleteChapter = () => {
    setIsLoading(true);

    CourseDeleteAction(courseId)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/teacher");
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

  //   Publish Chapter UnpublishChapterUpdateAction
  const publishCourse = () => {
    setIsLoading(true);

    if (isPublished) {
      CourseUnpublishAction(courseId)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.refresh();
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
    } else {
      CoursePublishAction(courseId)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.refresh();
            confetti.onOpen();
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
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {isLoading ? (
        <Button disabled>
          Please Wait <Loader2 className="h-4 w-4 ml-2 animate-spin" />
        </Button>
      ) : (
        <Button
          disabled={disabled}
          onClick={publishCourse}
          variant={"outline"}
          size={"sm"}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      )}
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
