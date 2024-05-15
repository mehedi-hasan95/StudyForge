"use client";

import queryString from "query-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  category: Category;
}
export const CategoryItems = ({ category }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCatId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCatId === category.id;
  const onClick = () => {
    const url = queryString.stringifyUrl(
      {
        url: pathName,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : category.id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <div className="">
      <Button
        onClick={onClick}
        variant={"outline"}
        className={cn(
          "flex transition hover:border-sky-700 items-center",
          isSelected && "bg-sky-200/20 text-sky-800 border-sky-700"
        )}
      >
        <Image
          src={category.catImage as string}
          alt=""
          height={20}
          width={20}
        />{" "}
        <p className="ml-2">{category.title}</p>
      </Button>
    </div>
  );
};
