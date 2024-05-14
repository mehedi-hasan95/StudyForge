import { db } from "@/lib/prismaDb";
import { AdminCategoryForm } from "../_components/admin-category-form";

const CategoryId = async ({ params }: { params: { catId: string } }) => {
  const category = await db.category.findUnique({
    where: { id: params.catId },
  });
  return (
    <div>
      <AdminCategoryForm initialData={category} />
    </div>
  );
};

export default CategoryId;
