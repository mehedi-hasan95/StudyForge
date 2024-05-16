import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chapter, Course, UserProgres } from "@prisma/client";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";

interface Props {
  course: Course & {
    chapter: (Chapter & {
      userProgres: UserProgres[] | null;
    })[];
  };
  progressCount: number;
}
export const MobileCourseSidebar = ({ course, progressCount }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
