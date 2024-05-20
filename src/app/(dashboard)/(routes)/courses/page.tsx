import { AllCategory } from "@/actions/admin/admin-category-action";
import { CategoryItems } from "./_components/category-items";
import { SearchInput } from "@/components/custom/search-input";
import { CurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { CourseList } from "./_components/course-list";
import { UserCoursesAction } from "@/actions/user/user-courses-action";
import { Suspense } from "react";
import LoadingAnimation from "@/components/custom/loading-animation";

interface Props {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: Props) => {
  const userId = CurrentUser();
  if (!userId) {
    return redirect("/");
  }
  const category = await AllCategory();
  const courses = UserCoursesAction({ ...searchParams });

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="md:hidden mb-4">
        <SearchInput />
      </div>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {category.map((item) => (
          <CategoryItems key={item.id} category={item} />
        ))}
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <CourseList courses={courses} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
