import type { Employee } from "@features/employee";

export type Company = {
  id: string;
  name: string;
  code: string;
  type: "group" | "company" | "branch";
  status: "active" | "inactive";
  address?: string;
  phone?: string;
  thumbnail?: string;
  // KPI fields — only meaningful for branch-level companies
  revenue?: number;
  orderCount?: number;
  staffCount?: number;
  openTime?: string;
  closeTime?: string;
  children?: Company[];
  staffs?: Employee[];
};
