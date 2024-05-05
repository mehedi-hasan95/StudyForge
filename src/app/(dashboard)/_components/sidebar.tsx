import Logo from "@/components/common/logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <Logo />
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
