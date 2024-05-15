"use client";
import { UserInfo } from "@/components/custom/user-info";
import { MobileSitebar } from "./mobile-sitebar";
import { usePathname } from "next/navigation";
import { SearchInput } from "@/components/custom/search-input";

export const NavBar = () => {
  const pathName = usePathname();
  const isSearchPage = pathName === "/search";
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSitebar />
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex ml-auto">
        <UserInfo />
      </div>
    </div>
  );
};
