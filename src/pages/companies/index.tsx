import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCompanyStore } from "@store/useCompanyStore";
import { useCompanyTree } from "./hooks/useCompanyTree";
import { CompanyTree } from "./components/CompanyTree";
import { CompanyFormDrawer } from "./components/CompanyFormDrawer";
import type { Company } from "@features/company";

export function CompaniesPage() {
  const { companies, deleteNode } = useCompanyTree();
  const navigate = useNavigate();
  const selectCompany = useCompanyStore((s) => s.selectCompany);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [addingParentId, setAddingParentId] = useState<string | null>(null);

  const handleSelect = (company: Company) => {
    selectCompany(company);
    void navigate({ to: "/companies/dashboard" });
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setAddingParentId(null);
    setDrawerOpen(true);
  };

  const handleAdd = (parentId: string) => {
    setEditingCompany(null);
    setAddingParentId(parentId);
    setDrawerOpen(true);
  };

  const handleAddRoot = () => {
    setEditingCompany(null);
    setAddingParentId(null);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEditingCompany(null);
    setAddingParentId(null);
  };

  const handleSubmit = (_values: unknown) => {
    // wire to real API when backend is ready
  };

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Quản lý Công ty</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Cấu trúc phân cấp tập đoàn, công ty và chi nhánh
          </Text>
        </Box>
        <Button onClick={handleAddRoot}>
          <Plus />
          Thêm mới
        </Button>
      </Flex>

      <Box bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="lg" py={2}>
        <CompanyTree
          companies={companies}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={deleteNode}
          onAdd={handleAdd}
        />
      </Box>

      <CompanyFormDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        company={editingCompany}
        parentId={addingParentId}
        onSubmit={handleSubmit}
      />
    </Flex>
  );
}
