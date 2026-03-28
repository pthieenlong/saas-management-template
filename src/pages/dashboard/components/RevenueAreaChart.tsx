import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRevenue } from "@utils/format";
import type { MonthlyRevenue } from "@lib/mock/charts";

type RevenueAreaChartProps = {
  data: MonthlyRevenue[];
};

export function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="totalRevenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1a8c75" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#1a8c75" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--chakra-colors-border-subtle)"
        />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}tr`}
          tick={{ fontSize: 12 }}
          width={48}
        />
        <Tooltip formatter={(v) => formatRevenue(Number(v))} />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Doanh thu"
          stroke="#1a8c75"
          fill="url(#totalRevenueGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
