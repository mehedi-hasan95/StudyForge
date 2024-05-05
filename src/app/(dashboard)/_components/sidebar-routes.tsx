"use client";
import { Compass, DraftingCompass, Layout, LineChart } from "lucide-react";
import { SidebarItems } from "./sidebar-items";
import { useCurrentUserRole } from "@/hooks/use-current-user";

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

const teacherRoute = [
  {
    icon: DraftingCompass,
    label: "Teacher",
    href: "/teacher",
  },
  {
    icon: LineChart,
    label: "Analytics",
    href: "/analytics",
  },
];
export const SidebarRoutes = () => {
  const currentUserRole = useCurrentUserRole();
  const routes = menus;
  const teacherMenu = teacherRoute;
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
      {currentUserRole === "TEACHER" &&
        teacherMenu.map((route) => (
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
