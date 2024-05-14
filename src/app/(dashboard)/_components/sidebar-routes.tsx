"use client";
import {
  Compass,
  DraftingCompass,
  Layout,
  LineChart,
  Split,
  UserRoundCheck,
} from "lucide-react";
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
const adminRoute = [
  {
    icon: UserRoundCheck,
    label: "Admin",
    href: "/admin",
  },
  {
    icon: Split,
    label: "Category",
    href: "/category",
  },
];
export const SidebarRoutes = () => {
  const currentUserRole = useCurrentUserRole();
  const routes = menus;
  const teacherMenu = teacherRoute;
  const adminMenu = adminRoute;
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
      {currentUserRole === "ADMIN" &&
        adminMenu.map((route) => (
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
