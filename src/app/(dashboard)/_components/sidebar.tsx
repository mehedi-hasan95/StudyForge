import Logo from "@/components/common/logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm md:pt-[80px]">
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
