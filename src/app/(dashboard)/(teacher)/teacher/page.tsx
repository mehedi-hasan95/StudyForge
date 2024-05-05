import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

const TeacherPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Total Course</h2>
        <Link href={"/teacher/course"}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherPage;
