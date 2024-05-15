import { AllCategory } from "@/actions/admin/admin-category-action";
import { CategoryItems } from "./_components/category-items";
import { SearchInput } from "@/components/custom/search-input";

const SearchPage = async () => {
  const category = await AllCategory();
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
    </div>
  );
};

export default SearchPage;
