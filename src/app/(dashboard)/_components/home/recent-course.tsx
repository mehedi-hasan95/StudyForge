import { RecentCourseAction } from "@/actions/user/user-courses-action";
import { RecentCourseList } from "./recent-course-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const RecentCourse = async () => {
  const data = await RecentCourseAction();
  return (
    <div className="bg-[#F2F8F1] py-10 md:py-16 lg:py-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center max-w-screen-md mx-auto space-y-3">
          <h4 className="text-lg font-medium">Our Recent Course</h4>
          <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
            Browse Our Course Catalog
          </h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt earum
            repudiandae magni beatae perferendis qui nam vitae ratione dolore
            aut?
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 md:py-16 lg:py-20">
          {data.map((item) => (
            <RecentCourseList data={item as any} key={item.id} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={"/courses"}>
            <Button variant={"success"}>View All Course</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
