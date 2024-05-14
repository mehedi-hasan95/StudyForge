"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Loader2, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { CategoryTypes } from "./category-colums";
import { DeleteCategoryAction } from "@/actions/admin/admin-category-action";
import { toast } from "sonner";
import { AlertDialogDemo } from "@/components/custom/confirm-modal";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  data: CategoryTypes;
}

export const CategoryCell = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const deleteCategory = (id: string) => {
    startTransition(() => {
      DeleteCategoryAction(id).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      });
    });
  };
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
            href={`/category/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Edit Category
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          asChild
        >
          <AlertDialogDemo onConfirm={() => deleteCategory(data.id)}>
            {isPending ? (
              <Button className="w-full" disabled size={"sm"}>
                Delete <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full" size={"sm"}>
                Delete <Trash className="h-4 w-4 ml-2" />
              </Button>
            )}
          </AlertDialogDemo>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
