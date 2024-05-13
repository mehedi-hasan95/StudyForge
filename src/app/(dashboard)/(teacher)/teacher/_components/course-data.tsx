import { DataTable } from "@/components/custom/data-table";
import { CourseTypes, columns } from "./course-colums";

interface Props {
  data: CourseTypes[];
}

export const CourseData = async ({ data }: Props) => {
  return (
    <div className="">
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};
