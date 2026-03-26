import { useState } from "react";
import { MOCK_COMPANY_TREE, type Company } from "@features/company";

export function useCompanyTree() {
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANY_TREE);

  const deleteNode = (id: string) => {
    const remove = (nodes: Company[]): Company[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) => ({ ...n, children: n.children ? remove(n.children) : undefined }));
    setCompanies(remove(companies));
  };

  return { companies, deleteNode };
}
