"use client";
import { UserInfo } from "@/components/custom/user-info";
import { MobileSitebar } from "./mobile-sitebar";
import { usePathname } from "next/navigation";
import { SearchInput } from "@/components/custom/search-input";
import Logo from "@/components/common/logo";

export const NavBar = () => {
  const pathName = usePathname();
  const isSearchPage = pathName === "/courses";
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
      <MobileSitebar />
      <Logo />
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <UserInfo />
    </div>
  );
};
