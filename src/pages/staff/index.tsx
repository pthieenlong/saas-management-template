import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { MOCK_USERS, MOCK_COMPANY_TREE, MOCK_BRANCHES } from "@lib/mock/companies";
import type { User } from "@lib/mock/companies";
import { useCompanyStore } from "@store/useCompanyStore";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@components/TablePagination";
import { StaffTable } from "./components/StaffTable";
import { StaffFilterBar } from "./components/StaffFilterBar";
import type { StaffFilters } from "./components/StaffFilterBar";
import { CreateStaffDrawer } from "./components/CreateStaffDrawer";

function getAllBranchIdsUnder(companyId: string): string[] {
  function findNode(nodes: typeof MOCK_COMPANY_TREE): (typeof MOCK_COMPANY_TREE)[0] | null {
    for (const node of nodes) {
      if (node.id === companyId) return node;
      if (node.children) {
        const found = findNode(node.children);
        if (found) return found;
      }
    }
    return null;
  }

  function collectBranches(nodes: typeof MOCK_COMPANY_TREE): string[] {
    const ids: string[] = [];
    for (const node of nodes) {
      if (node.type === "branch") ids.push(node.id);
      if (node.children) ids.push(...collectBranches(node.children));
    }
    return ids;
  }

  const node = findNode(MOCK_COMPANY_TREE);
  if (!node) return [];
  if (node.type === "branch") return [node.id];
  return collectBranches(node.children ?? []);
}

export function StaffPage() {
  const [filters, setFilters] = useState<StaffFilters>({
    search: "",
    status: "",
    roleId: "",
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [localUsers, setLocalUsers] = useState<User[]>(MOCK_USERS);

  const selectedCompany = useCompanyStore((s) => s.selectedCompany);
  const { currentUser, isAdmin, isManager } = useCurrentUser();

  const scopedUsers = selectedCompany
    ? (() => {
        const branchIds = getAllBranchIdsUnder(selectedCompany.id);
        return localUsers.filter((u) => branchIds.includes(u.branchId));
      })()
    : isManager
      ? localUsers.filter((u) => u.branchId === currentUser.branchId)
      : localUsers;

  const filtered = scopedUsers.filter((u) => {
    const matchesSearch =
      !filters.search.trim() ||
      u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      u.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "" ||
      (filters.status === "active" && u.isActive) ||
      (filters.status === "inactive" && !u.isActive);

    const matchesRole = !filters.roleId || u.roleId === filters.roleId;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const availableBranches = isAdmin
    ? MOCK_BRANCHES
    : MOCK_BRANCHES.filter((b) => b.id === currentUser.branchId);

  const canCreate = isAdmin || isManager;
  const pagination = usePagination(filtered, 10);

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Nhân viên</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            {selectedCompany
              ? `Nhân viên thuộc ${selectedCompany.name}`
              : isManager
                ? `Nhân viên chi nhánh của bạn`
                : "Tất cả nhân viên trong hệ thống"}
          </Text>
        </Box>
        <Flex align="center" gap={3}>
          <Text fontSize="sm" color="fg.muted">{filtered.length} nhân viên</Text>
          {canCreate && (
            <Button size="sm" onClick={() => setIsDrawerOpen(true)}>
              <UserPlus size={14} />
              Thêm nhân viên
            </Button>
          )}
        </Flex>
      </Flex>

      <StaffFilterBar
        filters={filters}
        onChange={setFilters}
        showRoleFilter={isAdmin}
      />

      {filtered.length === 0 ? (
        <Flex align="center" justify="center" h="200px" color="fg.muted">
          <Text fontSize="sm">Không tìm thấy nhân viên nào</Text>
        </Flex>
      ) : (
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="lg"
          overflow="hidden"
        >
          <StaffTable users={pagination.paginatedItems} />
          <TablePagination
            page={pagination.page}
            totalCount={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.setPage}
          />
        </Box>
      )}

      <CreateStaffDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        availableBranches={availableBranches}
        onSubmit={(values) => {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: values.name,
            email: values.email,
            phone: values.phone,
            avatar: null,
            joinDate: new Date().toISOString().split("T")[0],
            isActive: true,
            role: "",
            roleId: values.roleId,
            branchId: values.branchId,
            extraPermissionIds: [],
            revokedPermissionIds: [],
          };
          setLocalUsers((prev) => [...prev, newUser]);
        }}
      />
    </Flex>
  );
}
