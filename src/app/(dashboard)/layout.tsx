import { NavBar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="md:pl-56 h-[80px] fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="hidden md:flex flex-col w-56 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
