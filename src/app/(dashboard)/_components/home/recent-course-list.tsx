import { CardContainer } from "@/components/aceternity/3d-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormatPrice } from "@/lib/format";
import { Category, Course } from "@prisma/client";
import { format } from "date-fns";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: Course & {
    category: Category[];
    _count: {
      chapter: number;
    };
  };
}
export const RecentCourseList = async ({ data }: Props) => {
  return (
    <CardContainer>
      <Link href={`/course/${data.id}`}>
        <Card className="p-2">
          <Image
            src={data?.imageUrl as string}
            alt=""
            height={500}
            width={500}
          />
          <CardContent className="flex justify-between mt-4 p-0">
            <p className="text-sm flex items-center gap-1">
              <Clock className="h-4 w-4" />{" "}
              {format(data.createdAt, "MMMM do, yyyy")}
            </p>
            <p className="text-sm flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {data?._count?.chapter}{" "}
              {data?._count?.chapter > 1 ? "Chapters" : "Chapter"}
            </p>
          </CardContent>
          <CardTitle className="pt-4 px-0">
            <div className="text-lg">{data.title}</div>
          </CardTitle>
          <CardContent className="p-0">
            <div className="line-clamp-2 text-sm">{data.description}</div>
          </CardContent>
          <CardFooter className="px-0 pt-2 text-xl font-bold">
            {FormatPrice(data?.price as number)}
          </CardFooter>
        </Card>
      </Link>
    </CardContainer>
  );
};
