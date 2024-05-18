"use client";

import { Button } from "@/components/ui/button";
import { FormatPrice } from "@/lib/format";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  courseId: string;
  price: number;
}
export const CoursePurchase = ({ courseId, price }: Props) => {
  // console.log(courseId);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const result = await response.json();
      if (result) {
        window.location.assign(result?.url);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={() => onClick()}
      disabled={isLoading}
      className="w-full md:w-auto"
    >
      Enroll for {FormatPrice(price)}
    </Button>
  );
};
