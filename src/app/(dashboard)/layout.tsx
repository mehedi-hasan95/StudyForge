import { NavBar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-[49] bg-white">
        <NavBar />
      </div>
      <div className="hidden md:flex flex-col w-72 fixed inset-y-0 z-[48]">
        <Sidebar />
      </div>
      <main className="pt-24 md:pl-72">
        <div className="max-w-screen-xl mx-auto p-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
