import { MOCK_BRANCHES } from "@features/company";
import { MOCK_MONTHLY_BY_COMPANY, MOCK_MONTHLY_TOTAL } from "@lib/mock/charts";
import type { MonthlyRevenue, CompanyMonthlyData } from "@lib/mock/charts";
import type { Company } from "@features/company";

type RevenueCompareRow = Record<string, string | number>;

type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalStaff: number;
  activeStores: number;
  totalStores: number;
  monthlyTotal: MonthlyRevenue[];
  monthlyByCompany: CompanyMonthlyData[];
  revenueCompareData: RevenueCompareRow[];
  branches: Company[];
};

function buildRevenueCompareData(
  branches: Company[],
  monthlyByCompany: CompanyMonthlyData[],
): RevenueCompareRow[] {
  return ["Th10", "Th11", "Th12", "Th1", "Th2", "Th3"].map((month, i) => {
    const row: RevenueCompareRow = { month };
    monthlyByCompany.forEach((s) => {
      const branch = branches.find((b) => b.id === s.companyId);
      if (branch) row[branch.name] = s.data[i]?.revenue ?? 0;
    });
    return row;
  });
}

export function useDashboardStats(): DashboardStats | null {
  const branches = MOCK_BRANCHES;
  const monthlyByCompany = MOCK_MONTHLY_BY_COMPANY;
  const monthlyTotal = MOCK_MONTHLY_TOTAL;

  if (!branches || !monthlyTotal) return null;

  return {
    totalRevenue: branches.reduce((sum, b) => sum + (b.revenue ?? 0), 0),
    totalOrders: branches.reduce((sum, b) => sum + (b.orderCount ?? 0), 0),
    totalStaff: branches.reduce((sum, b) => sum + (b.staffCount ?? 0), 0),
    activeStores: branches.filter((b) => b.status === "active").length,
    totalStores: branches.length,
    monthlyTotal,
    monthlyByCompany,
    revenueCompareData: buildRevenueCompareData(branches, monthlyByCompany),
    branches,
  };
}
