"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseTypes } from "./course-colums";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface Props {
  data: CourseTypes;
}

export const CourseCell = ({ data }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/teacher/course/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Edit Course
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
