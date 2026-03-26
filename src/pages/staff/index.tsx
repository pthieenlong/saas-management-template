import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useState } from "react";
import { MOCK_USERS, MOCK_COMPANY_TREE } from "@lib/mock/companies";
import { useCompanyStore } from "@store/useCompanyStore";
import { StaffTable } from "./components/StaffTable";

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
  const [search, setSearch] = useState("");
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);

  const scopedUsers = selectedCompany
    ? (() => {
        const branchIds = getAllBranchIdsUnder(selectedCompany.id);
        return MOCK_USERS.filter((u) => branchIds.includes(u.branchId));
      })()
    : MOCK_USERS;

  const filtered = search.trim()
    ? scopedUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : scopedUsers;

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Nhân viên</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            {selectedCompany
              ? `Nhân viên thuộc ${selectedCompany.name}`
              : "Tất cả nhân viên trong hệ thống"}
          </Text>
        </Box>
        <Text fontSize="sm" color="fg.muted">{filtered.length} nhân viên</Text>
      </Flex>

      <Box position="relative">
        <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="fg.muted" pointerEvents="none">
          <Search size={14} />
        </Box>
        <Input
          pl={8}
          placeholder="Tìm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="sm"
        />
      </Box>

      {filtered.length === 0 ? (
        <Flex align="center" justify="center" h="200px" color="fg.muted">
          <Text fontSize="sm">Không tìm thấy nhân viên nào</Text>
        </Flex>
      ) : (
        <Box bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="lg" overflow="hidden">
          <StaffTable users={filtered} />
        </Box>
      )}
    </Flex>
  );
}
