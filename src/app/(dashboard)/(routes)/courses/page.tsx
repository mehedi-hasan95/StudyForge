import { AllCategory } from "@/actions/admin/admin-category-action";
import { CategoryItems } from "./_components/category-items";
import { SearchInput } from "@/components/custom/search-input";
import { CurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { CourseList } from "./_components/course-list";
import { UserCoursesAction } from "@/actions/user/user-courses-action";

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
  const courses = await UserCoursesAction({ ...searchParams });

  return (
    <div>
      <div className="md:hidden mb-4">
        <SearchInput />
      </div>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {category.map((item) => (
          <CategoryItems key={item.id} category={item} />
        ))}
      </div>
      <CourseList courses={courses} />
    </div>
  );
};

export default SearchPage;