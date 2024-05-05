import { UserInfo } from "@/components/custom/user-info";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";

const DashboardPage = async () => {
  const user = await CurrentUser();
  const role = await CurrentUserRole();
  return (
    <div className="commonCss">
      <p>{user?.name}</p>
      <p>
        <UserInfo />
      </p>
    </div>
  );
};

export default DashboardPage;
