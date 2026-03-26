import { Box, Flex } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LayoutGrid,
  Warehouse,
  Users,
  BarChart2,
  Settings,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { Sidebar, type NavItem } from "@components/layout/Sidebar";
import { Header } from "@components/layout/Header";

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: ShoppingCart, label: "Đơn hàng", id: "orders" },
  { icon: Package, label: "Sản phẩm", id: "products" },
  { icon: LayoutGrid, label: "Danh mục", id: "categories" },
  { icon: Warehouse, label: "Tồn kho", id: "inventory" },
  { icon: Users, label: "Nhân viên", id: "staff" },
  { icon: BarChart2, label: "Báo cáo", id: "reports" },
  { icon: Building2, label: "Công ty", id: "companies" },
  { icon: ShieldCheck, label: "Phân quyền", id: "user-permissions" },
  { icon: Settings, label: "Cài đặt", id: "settings" },
];

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  orders: "Đơn hàng",
  products: "Sản phẩm",
  categories: "Danh mục",
  inventory: "Tồn kho",
  staff: "Nhân viên",
  reports: "Báo cáo",
  companies: "Quản lý Công ty",
  "user-permissions": "Phân quyền người dùng",
  settings: "Cài đặt",
};

const ROUTE_MAP: Record<string, string> = {
  dashboard: "/dashboard",
  orders: "/orders",
  products: "/products",
  categories: "/categories",
  inventory: "/inventory",
  staff: "/staff",
  reports: "/reports",
  companies: "/companies",
  "user-permissions": "/user-permissions",
  settings: "/settings",
};

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCompanyContext = location.pathname.startsWith("/companies/dashboard");

  const visibleNavItems = isCompanyContext
    ? NAV_ITEMS.filter((item) => item.id !== "companies")
    : NAV_ITEMS;

  const activeItem =
    NAV_ITEMS.find((item) =>
      location.pathname.startsWith(ROUTE_MAP[item.id] ?? "")
    )?.id ?? "dashboard";

  const handleNavigate = (id: string) => {
    const route = ROUTE_MAP[id];
    if (route) void navigate({ to: route });
  };

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar
        navItems={visibleNavItems}
        activeItem={activeItem}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <Flex direction="column" flex={1} overflow="hidden">
        <Header title={PAGE_TITLES[activeItem] ?? ""} />
        <Box flex={1} overflow="auto" bg="bg.canvas" p={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
