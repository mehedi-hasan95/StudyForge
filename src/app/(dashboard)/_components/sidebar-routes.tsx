"use client";
import { Compass, Layout } from "lucide-react";
import { SidebarItems } from "./sidebar-items";

const menus = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Brouse",
    href: "/search",
  },
];

export const SidebarRoutes = () => {
  const routes = menus;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItems
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};
