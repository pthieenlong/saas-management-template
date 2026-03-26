import { create } from "zustand";
import type { Company } from "@features/company";

type CompanyState = {
  selectedCompany: Company | null;
  selectCompany: (company: Company) => void;
  clearCompany: () => void;
};

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedCompany: null,
  selectCompany: (company) => set({ selectedCompany: company }),
  clearCompany: () => set({ selectedCompany: null }),
}));
