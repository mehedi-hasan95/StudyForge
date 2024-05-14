"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
// import { CourseCell } from "./course-cell";
import Image from "next/image";
import { CategoryCell } from "./category-cell";

export type CategoryTypes = {
  id: string;
  title: string;
  catImage: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryTypes>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "catImage",
    header: "Category Image",
    cell: ({ row }) => {
      const image = row.getValue("catImage" || "");
      return (
        <div>
          <Image src={image as string} alt="" height={40} width={40} />
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Action",
    cell: ({ row }) => <CategoryCell data={row.original} />,
  },
];
