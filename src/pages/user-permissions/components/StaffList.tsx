import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import type { User, Role } from "@lib/mock/companies";
import { StaffItem } from "./StaffItem";

interface StaffListProps {
  users: User[];
  roles: Role[];
  userRoleMap: Record<string, string>;
  selectedUserId: string | null;
  onSelect: (id: string) => void;
}

export function StaffList({ users, roles, userRoleMap, selectedUserId, onSelect }: StaffListProps) {
  if (users.length === 0) {
    return (
      <Flex align="center" justify="center" py={10} color="fg.muted">
        <Text fontSize="sm">Chi nhánh này chưa có nhân viên</Text>
      </Flex>
    );
  }

  return (
    <Box bg="bg.surface" borderWidth="1px" borderColor="border.muted" borderRadius="lg" overflow="hidden">
      <Flex px={4} py={3} borderBottomWidth="1px" borderColor="border.muted">
        <Text fontWeight="semibold" fontSize="sm">
          Nhân viên ({users.length})
        </Text>
      </Flex>
      <Stack gap={0} py={1}>
        {users.map((user) => {
          const roleId = userRoleMap[user.id] ?? user.roleId;
          const role = roles.find((r) => r.id === roleId) ?? roles[0];
          return (
            <StaffItem
              key={user.id}
              user={user}
              role={role}
              isSelected={user.id === selectedUserId}
              onSelect={onSelect}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
