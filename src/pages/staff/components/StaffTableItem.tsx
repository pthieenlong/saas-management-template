import { Avatar, Badge, Box, Circle, Flex, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "@lib/mock/companies";
import { MOCK_ROLES, MOCK_COMPANY_TREE } from "@lib/mock/companies";

const ROLE_COLOR: Record<string, string> = {
  "role-admin": "primary",
  "role-manager": "accent",
  "role-cashier": "green",
  "role-warehouse": "orange",
};

function getBranchName(branchId: string): string {
  function find(nodes: typeof MOCK_COMPANY_TREE): string | null {
    for (const node of nodes) {
      if (node.id === branchId) return node.name;
      if (node.children) {
        const found = find(node.children);
        if (found) return found;
      }
    }
    return null;
  }
  return find(MOCK_COMPANY_TREE) ?? branchId;
}

interface StaffTableItemProps {
  user: User;
}

export function StaffTableItem({ user }: StaffTableItemProps) {
  const navigate = useNavigate();
  const role = MOCK_ROLES.find((r) => r.id === user.roleId) ?? MOCK_ROLES[0];
  const branchName = getBranchName(user.branchId);

  return (
    <Table.Row
      cursor="pointer"
      _hover={{ bg: "bg.surface" }}
      onClick={() => navigate({ to: "/staff/$staffId", params: { staffId: user.id } })}
    >
      <Table.Cell>
        <Flex align="center" gap={3}>
          <Avatar.Root size="sm" colorPalette="primary">
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
          <Box>
            <Text fontSize="sm" fontWeight="medium">{user.name}</Text>
            <Text fontSize="xs" color="fg.muted">{user.email}</Text>
          </Box>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Badge size="sm" colorPalette={ROLE_COLOR[user.roleId] ?? "gray"}>
          {role.name}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" color="fg.muted">{branchName}</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex align="center" gap={2}>
          <Circle size="8px" bg={user.isActive ? "green.500" : "gray.300"} />
          <Text fontSize="xs" color={user.isActive ? "green.600" : "fg.muted"}>
            {user.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
          </Text>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}
