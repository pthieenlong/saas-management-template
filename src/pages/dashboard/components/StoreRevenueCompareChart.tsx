import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatRevenue } from "@utils/format";
import type { Company } from "@features/company";

const STORE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

type RevenueCompareRow = Record<string, string | number>;

type StoreRevenueCompareChartProps = {
  data: RevenueCompareRow[];
  branches: Company[];
};

export function StoreRevenueCompareChart({
  data,
  branches,
}: StoreRevenueCompareChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
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
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {branches.map((branch, i) => (
          <Bar
            key={branch.id}
            dataKey={branch.name}
            fill={STORE_COLORS[i]}
            radius={[3, 3, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
