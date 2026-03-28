import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyRevenue } from "@lib/mock/charts";

type OrdersBarChartProps = {
  data: MonthlyRevenue[];
};

export function OrdersBarChart({ data }: OrdersBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--chakra-colors-border-subtle)"
        />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={32} />
        <Tooltip />
        <Bar
          dataKey="orders"
          name="Đơn hàng"
          fill="#1a8c75"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
