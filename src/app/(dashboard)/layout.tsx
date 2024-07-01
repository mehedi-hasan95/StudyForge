import { Footer } from "@/components/common/footer";
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
      <main className="pt-[80px] md:pl-72">
        <div className="">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
