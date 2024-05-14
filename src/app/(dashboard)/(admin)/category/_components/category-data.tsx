import { DataTable } from "@/components/custom/data-table";
import { CategoryTypes, columns } from "./category-colums";

interface Props {
  data: CategoryTypes[];
}

export const CategoryData = async ({ data }: Props) => {
  return (
    <div className="">
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};
