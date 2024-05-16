import Link from "next/link";

import Image from "next/image";
import { IconBadge } from "@/components/custom/icon-badge";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormatPrice } from "@/lib/format";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}
export const CourseCard = ({
  category,
  chaptersLength,
  id,
  imageUrl,
  price,
  progress,
  title,
}: Props) => {
  return (
    <Link href={`/course/${id}`} className="border rounded-md">
      <div className="p-2">
        <Image src={imageUrl} alt={title} height={500} width={500} />
        <div className="py-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-muted-foreground text-sm">{category}</p>
          <div className="flex gap-1 items-center py-3">
            <IconBadge icon={BookOpen} size={"sm"} />{" "}
            <span>
              {chaptersLength} {chaptersLength > 1 ? "Chapters" : "Chapter"}
            </span>
          </div>
          <div className="">
            {progress !== null ? (
              <div>To Do</div>
            ) : (
              <div className="text-slate-700 font-semibold">
                {FormatPrice(price)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
