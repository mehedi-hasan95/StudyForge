import { UserDashboardAction } from "@/actions/user/user-dashboard-action";
import { CourseList } from "../courses/_components/course-list";
import { InfoCard } from "./_components/info-card";
import { CircleCheck, Clock } from "lucide-react";

const Dashboard = async () => {
  const { completedCourses, coursesInProgress } = await UserDashboardAction();
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-5">
        <InfoCard
          icon={Clock}
          label="Course In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CircleCheck}
          label="Completed Course"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CourseList
        courses={[...coursesInProgress, ...completedCourses] as any}
      />
    </div>
  );
};

export default Dashboard;
