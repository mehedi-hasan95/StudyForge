"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  icon: LucideIcon;
  href: string;
  label: string;
}
export const SidebarItems = ({ icon: Icon, href, label }: props) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      type="button"
      className={cn(
        " hover:bg-slate-300 pl-6 transition-all font-[500] flex items-center",
        isActive &&
          "bg-sky-300/20 text-sky-700 hover:bg-sky-300/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
