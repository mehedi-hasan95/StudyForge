"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}
export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/progress", {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          chapterId,
          isCompleted: !isCompleted,
        }),
      });

      const result = await response.json();
      if (result) {
        if (!isCompleted && nextChapterId) {
          router.push(`/course/${courseId}/chapters/${nextChapterId}`);
        }
        if (!isCompleted && !nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went worng");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant={isCompleted ? "outline" : "success"}
        className="w-full md:w-auto"
      >
        {isCompleted ? "Set Uncomplete" : "Mark as Completed"}{" "}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
