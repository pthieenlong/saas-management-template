export type SalaryStatus = "pending" | "approved" | "paid";

export type SalaryRecord = {
  id: string;
  userId: string;
  month: number;
  year: number;
  baseSalary: number;
  allowances: {
    meal: number;
    transport: number;
    other: number;
  };
  bonus: number;
  deductions: {
    insurance: number;
    tax: number;
    unpaidLeave: number;
  };
  status: SalaryStatus;
  note: string;
};

export function calcNetSalary(r: SalaryRecord): number {
  const totalAllowances = r.allowances.meal + r.allowances.transport + r.allowances.other;
  const totalDeductions = r.deductions.insurance + r.deductions.tax + r.deductions.unpaidLeave;
  return r.baseSalary + totalAllowances + r.bonus - totalDeductions;
}

export const MOCK_SALARIES: SalaryRecord[] = [
  // user-1 (Nguyễn Văn An - Manager)
  {
    id: "sal-1-2025-01",
    userId: "user-1",
    month: 1, year: 2025,
    baseSalary: 15000000,
    allowances: { meal: 730000, transport: 500000, other: 0 },
    bonus: 0,
    deductions: { insurance: 1050000, tax: 500000, unpaidLeave: 0 },
    status: "paid",
    note: "",
  },
  {
    id: "sal-1-2025-02",
    userId: "user-1",
    month: 2, year: 2025,
    baseSalary: 15000000,
    allowances: { meal: 660000, transport: 500000, other: 0 },
    bonus: 2000000,
    deductions: { insurance: 1050000, tax: 700000, unpaidLeave: 0 },
    status: "paid",
    note: "Thưởng Tết Nguyên Đán",
  },
  {
    id: "sal-1-2025-03",
    userId: "user-1",
    month: 3, year: 2025,
    baseSalary: 15000000,
    allowances: { meal: 730000, transport: 500000, other: 0 },
    bonus: 0,
    deductions: { insurance: 1050000, tax: 500000, unpaidLeave: 500000 },
    status: "approved",
    note: "Nghỉ không phép 1 ngày",
  },
  {
    id: "sal-1-2025-04",
    userId: "user-1",
    month: 4, year: 2025,
    baseSalary: 15000000,
    allowances: { meal: 730000, transport: 500000, other: 0 },
    bonus: 0,
    deductions: { insurance: 1050000, tax: 500000, unpaidLeave: 0 },
    status: "pending",
    note: "",
  },
  // user-2 (Trần Thị Bích - Cashier)
  {
    id: "sal-2-2025-01",
    userId: "user-2",
    month: 1, year: 2025,
    baseSalary: 8000000,
    allowances: { meal: 730000, transport: 300000, other: 0 },
    bonus: 0,
    deductions: { insurance: 560000, tax: 0, unpaidLeave: 0 },
    status: "paid",
    note: "",
  },
  {
    id: "sal-2-2025-02",
    userId: "user-2",
    month: 2, year: 2025,
    baseSalary: 8000000,
    allowances: { meal: 660000, transport: 300000, other: 0 },
    bonus: 1000000,
    deductions: { insurance: 560000, tax: 0, unpaidLeave: 0 },
    status: "paid",
    note: "Thưởng Tết",
  },
  {
    id: "sal-2-2025-03",
    userId: "user-2",
    month: 3, year: 2025,
    baseSalary: 8000000,
    allowances: { meal: 730000, transport: 300000, other: 0 },
    bonus: 0,
    deductions: { insurance: 560000, tax: 0, unpaidLeave: 0 },
    status: "approved",
    note: "",
  },
  {
    id: "sal-2-2025-04",
    userId: "user-2",
    month: 4, year: 2025,
    baseSalary: 8000000,
    allowances: { meal: 730000, transport: 300000, other: 0 },
    bonus: 0,
    deductions: { insurance: 560000, tax: 0, unpaidLeave: 0 },
    status: "pending",
    note: "",
  },
  // user-admin
  {
    id: "sal-admin-2025-01",
    userId: "user-admin",
    month: 1, year: 2025,
    baseSalary: 30000000,
    allowances: { meal: 730000, transport: 1000000, other: 500000 },
    bonus: 0,
    deductions: { insurance: 2100000, tax: 3000000, unpaidLeave: 0 },
    status: "paid",
    note: "",
  },
  {
    id: "sal-admin-2025-02",
    userId: "user-admin",
    month: 2, year: 2025,
    baseSalary: 30000000,
    allowances: { meal: 660000, transport: 1000000, other: 500000 },
    bonus: 5000000,
    deductions: { insurance: 2100000, tax: 3500000, unpaidLeave: 0 },
    status: "paid",
    note: "Thưởng Tết Nguyên Đán",
  },
  {
    id: "sal-admin-2025-03",
    userId: "user-admin",
    month: 3, year: 2025,
    baseSalary: 30000000,
    allowances: { meal: 730000, transport: 1000000, other: 500000 },
    bonus: 0,
    deductions: { insurance: 2100000, tax: 3000000, unpaidLeave: 0 },
    status: "approved",
    note: "",
  },
  {
    id: "sal-admin-2025-04",
    userId: "user-admin",
    month: 4, year: 2025,
    baseSalary: 30000000,
    allowances: { meal: 730000, transport: 1000000, other: 500000 },
    bonus: 0,
    deductions: { insurance: 2100000, tax: 3000000, unpaidLeave: 0 },
    status: "pending",
    note: "",
  },
];
