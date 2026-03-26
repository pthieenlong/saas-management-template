import { Box } from "@chakra-ui/react";
import type { Company } from "@features/company";
import { CompanyTreeItem } from "./CompanyTreeItem";

interface CompanyTreeProps {
  companies: Company[];
  selectedId?: string;
  onSelect?: (company: Company) => void;
  onEdit?: (company: Company) => void;
  onDelete?: (id: string) => void;
  onAdd?: (parentId: string) => void;
}

export function CompanyTree({ companies, selectedId, onSelect, onEdit, onDelete, onAdd }: CompanyTreeProps) {
  return (
    <Box>
      {companies.map((company) => (
        <CompanyTreeItem
          key={company.id}
          company={company}
          selectedId={selectedId}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      ))}
    </Box>
  );
}
