import { TeacherAnalyticsAction } from "@/actions/teacher/teacher-analytics-action";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const { data, totalRevenue, totalSales } = await TeacherAnalyticsAction();
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-5 mb-5 md:mb-10">
        <DataCard label="Total Sale" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
