import { UserInfo } from "@/components/custom/user-info";
import { MobileSitebar } from "./mobile-sitebar";

export const NavBar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSitebar />
      <div className="flex ml-auto">
        <UserInfo />
      </div>
    </div>
  );
};
