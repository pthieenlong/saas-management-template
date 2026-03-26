import { Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { TrendingUp, ShoppingCart, Users, Store } from "lucide-react";
import { formatRevenue } from "@utils/format";
import { KpiCard } from "@components/KpiCard";
import { useDashboardStats } from "./hooks/useDashboardStats";
import { ChartPanel } from "./components/ChartPanel";
import { RevenueAreaChart } from "./components/RevenueAreaChart";
import { OrdersBarChart } from "./components/OrdersBarChart";
import { StoreRevenueCompareChart } from "./components/StoreRevenueCompareChart";
import { StoreRevenueList } from "./components/StoreRevenueList";

function AdminDashboard() {
  const stats = useDashboardStats();
  if (!stats) return <Spinner />;

  return (
    <Flex direction="column" gap={6}>
      <Heading size="lg">Tổng quan chuỗi</Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        <KpiCard
          label="Tổng doanh thu"
          value={formatRevenue(stats.totalRevenue)}
          icon={TrendingUp}
          color="green"
        />
        <KpiCard
          label="Tổng đơn hàng"
          value={stats.totalOrders.toString()}
          icon={ShoppingCart}
          color="blue"
        />
        <KpiCard
          label="Tổng nhân viên"
          value={stats.totalStaff.toString()}
          icon={Users}
          color="purple"
        />
        <KpiCard
          label="Chi nhánh hoạt động"
          value={`${stats.activeStores} / ${stats.totalStores}`}
          icon={Store}
          color="orange"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
        <ChartPanel title="Doanh thu toàn chuỗi (6 tháng)">
          <RevenueAreaChart data={stats.monthlyTotal} />
        </ChartPanel>
        <ChartPanel title="Đơn hàng toàn chuỗi (6 tháng)">
          <OrdersBarChart data={stats.monthlyTotal} />
        </ChartPanel>
      </SimpleGrid>

      <ChartPanel title="So sánh doanh thu các chi nhánh (6 tháng)">
        <StoreRevenueCompareChart
          data={stats.revenueCompareData}
          branches={stats.branches}
        />
      </ChartPanel>

      <Flex direction="column" gap={3}>
        <Heading size="sm">Doanh thu tháng này theo chi nhánh</Heading>
        <StoreRevenueList branches={stats.branches} />
      </Flex>
    </Flex>
  );
}

export function DashboardPage() {
  return <AdminDashboard />;
}
