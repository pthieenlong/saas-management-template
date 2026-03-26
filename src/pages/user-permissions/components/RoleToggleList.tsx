import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { Role } from "@lib/mock/companies";
import { RoleToggleItem } from "./RoleToggleItem";

interface RoleToggleListProps {
  roles: Role[];
  selectedRoleId: string;
  rolePermissions: Record<string, string[]>;
  onSelect: (roleId: string) => void;
}

export function RoleToggleList({
  roles,
  selectedRoleId,
  rolePermissions,
  onSelect,
}: RoleToggleListProps) {
  return (
    <Box
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex px={4} py={3} borderBottomWidth="1px" borderColor="border.subtle">
        <Text fontWeight="semibold" fontSize="sm">
          Roles
        </Text>
      </Flex>
      <Stack gap={0} py={1}>
        {roles.map((role) => (
          <RoleToggleItem
            key={role.id}
            role={role}
            permissionCount={rolePermissions[role.id]?.length ?? 0}
            isSelected={role.id === selectedRoleId}
            onSelect={onSelect}
          />
        ))}
      </Stack>
    </Box>
  );
}
