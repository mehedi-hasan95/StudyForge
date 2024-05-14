import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prismaDb";
import { format } from "date-fns";
import Link from "next/link";
import { CategoryData } from "./_components/category-data";

const CategoryPage = async () => {
  const category = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatCourse = category.map((cat) => ({
    id: cat.id,
    title: cat.title,
    catImage: cat.catImage,
    createdAt: format(cat.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Total Category({category.length})</h2>
        <Link href={"/category/new"}>
          <Button>Create Category</Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <CategoryData data={formatCourse as any} />
    </div>
  );
};

export default CategoryPage;
