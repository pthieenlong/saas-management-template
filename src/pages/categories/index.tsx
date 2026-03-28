import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MOCK_CATEGORIES, type Category } from "@lib/mock/categories";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@components/TablePagination";
import { CategoryTable } from "./components/CategoryTable";
import { CategoryFilterBar, type CategoryFilters } from "./components/CategoryFilterBar";

export function CategoriesPage() {
  const [filters, setFilters] = useState<CategoryFilters>({
    search: "",
    parentId: "",
    status: "",
  });
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);

  const { isAdmin } = useCurrentUser();
  const navigate = useNavigate();

  const handleEdit = (category: Category) => {
    void navigate({ to: "/categories/$categoryId", params: { categoryId: category.id } });
  };

  const handleToggleActive = (category: Category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  const handleDelete = (category: Category) => {
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
  };

  const filtered = categories.filter((c) => {
    const matchesSearch =
      !filters.search.trim() ||
      c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.slug.includes(filters.search.toLowerCase());

    const matchesParent =
      filters.parentId === "" ||
      (filters.parentId === "__root__" && c.parentId === null) ||
      c.parentId === filters.parentId;

    const matchesStatus =
      filters.status === "" ||
      (filters.status === "active" && c.isActive) ||
      (filters.status === "inactive" && !c.isActive);

    return matchesSearch && matchesParent && matchesStatus;
  });

  const pagination = usePagination(filtered, 10);

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Danh mục</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Quản lý cây danh mục sản phẩm
          </Text>
        </Box>
        <Flex align="center" gap={3}>
          <Text fontSize="sm" color="fg.muted">
            {filtered.length} danh mục
          </Text>
          {isAdmin && (
            <Button
              size="sm"
              onClick={() => navigate({ to: "/categories/new" })}
            >
              <Plus size={14} />
              Thêm danh mục
            </Button>
          )}
        </Flex>
      </Flex>

      <CategoryFilterBar filters={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <Flex align="center" justify="center" h="200px" color="fg.muted">
          <Text fontSize="sm">Không tìm thấy danh mục nào</Text>
        </Flex>
      ) : (
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="lg"
          overflow="hidden"
        >
          <CategoryTable
            categories={pagination.paginatedItems}
            canEdit={isAdmin}
            onToggleActive={handleToggleActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <TablePagination
            page={pagination.page}
            totalCount={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.setPage}
          />
        </Box>
      )}
    </Flex>
  );
}
