import { Badge, Box, Flex, NativeSelect, Text } from "@chakra-ui/react";
import type { Role } from "@lib/mock/companies";

interface StaffRoleSelectProps {
  roleId: string;
  role: Role;
  allRoles: Role[];
  effectivePermissionCount: number;
  onAssignRole: (roleId: string) => void;
}

export function StaffRoleSelect({
  roleId,
  role,
  allRoles,
  effectivePermissionCount,
  onAssignRole,
}: StaffRoleSelectProps) {
  return (
    <Box
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={4}
    >
      <Flex align="center" gap={3} mb={3}>
        <Text fontWeight="semibold" fontSize="sm">Phân quyền</Text>
        <Badge colorPalette="gray" size="sm" ml="auto">
          {effectivePermissionCount} quyền hiệu lực
        </Badge>
      </Flex>

      <Flex align="center" gap={3}>
        <Text fontSize="sm" fontWeight="medium" flexShrink={0}>Role:</Text>
        <NativeSelect.Root flex={1} size="sm">
          <NativeSelect.Field
            value={roleId}
            onChange={(e) => onAssignRole(e.target.value)}
          >
            {allRoles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Text fontSize="xs" color="fg.muted" flexShrink={0}>
          {role.permissionIds.length} quyền mặc định
        </Text>
      </Flex>
    </Box>
  );
}
