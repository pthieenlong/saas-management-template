export type MonthlyRevenue = {
  month: string;
  revenue: number;
  orders: number;
};

export type CompanyMonthlyData = {
  companyId: string;
  data: MonthlyRevenue[];
};

// Doanh thu theo tháng cho từng chi nhánh (6 tháng gần nhất)
export const MOCK_MONTHLY_BY_COMPANY: CompanyMonthlyData[] = [
  {
    companyId: "branch-q1",
    data: [
      { month: "Th10", revenue: 98_000_000, orders: 62 },
      { month: "Th11", revenue: 105_000_000, orders: 70 },
      { month: "Th12", revenue: 142_000_000, orders: 95 },
      { month: "Th1", revenue: 110_000_000, orders: 73 },
      { month: "Th2", revenue: 118_000_000, orders: 79 },
      { month: "Th3", revenue: 128_500_000, orders: 84 },
    ],
  },
  {
    companyId: "branch-q3",
    data: [
      { month: "Th10", revenue: 72_000_000, orders: 44 },
      { month: "Th11", revenue: 80_000_000, orders: 52 },
      { month: "Th12", revenue: 110_000_000, orders: 71 },
      { month: "Th1", revenue: 88_000_000, orders: 58 },
      { month: "Th2", revenue: 91_000_000, orders: 60 },
      { month: "Th3", revenue: 95_200_000, orders: 61 },
    ],
  },
  {
    companyId: "branch-hk",
    data: [
      { month: "Th10", revenue: 50_000_000, orders: 30 },
      { month: "Th11", revenue: 55_000_000, orders: 35 },
      { month: "Th12", revenue: 80_000_000, orders: 52 },
      { month: "Th1", revenue: 62_000_000, orders: 38 },
      { month: "Th2", revenue: 64_000_000, orders: 40 },
      { month: "Th3", revenue: 67_800_000, orders: 42 },
    ],
  },
];

// Tổng hợp theo tháng cho Admin dashboard
export const MOCK_MONTHLY_TOTAL: MonthlyRevenue[] = ["Th10", "Th11", "Th12", "Th1", "Th2", "Th3"].map(
  (month, i) => ({
    month,
    revenue: MOCK_MONTHLY_BY_COMPANY.reduce((sum, s) => sum + (s.data[i]?.revenue ?? 0), 0),
    orders: MOCK_MONTHLY_BY_COMPANY.reduce((sum, s) => sum + (s.data[i]?.orders ?? 0), 0),
  }),
);
