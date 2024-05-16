import Logo from "@/components/common/logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="pt-5 pb-7 pl-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
