import { Box, Button, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Save } from "lucide-react";
import { useRolePermissions } from "./hooks/useRolePermissions";
import { RoleToggleList } from "./components/RoleToggleList";
import { PermissionGroup } from "@components/PermissionGroup";
import { MOCK_PERMISSIONS } from "@lib/mock/companies";

function groupPermissions() {
  const groups: Record<string, typeof MOCK_PERMISSIONS> = {};
  for (const perm of MOCK_PERMISSIONS) {
    if (!groups[perm.group]) groups[perm.group] = [];
    groups[perm.group].push(perm);
  }
  return groups;
}

const PERMISSION_GROUPS = groupPermissions();

export function UserPermissionsPage() {
  const {
    roles,
    selectedRoleId,
    selectedRole,
    permissionIds,
    setSelectedRoleId,
    hasPermission,
    togglePermission,
    toggleGroup,
    rolePermissions,
  } = useRolePermissions();

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Phân quyền</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Chọn role để xem và chỉnh sửa danh sách quyền
          </Text>
        </Box>
        <Button size="sm">
          <Save size={14} />
          Lưu thay đổi
        </Button>
      </Flex>

      <Grid templateColumns="220px 1fr" gap={5} alignItems="start">
        {/* Left: role list */}
        <RoleToggleList
          roles={roles}
          selectedRoleId={selectedRoleId}
          rolePermissions={rolePermissions}
          onSelect={setSelectedRoleId}
        />

        {/* Right: permissions */}
        <Flex direction="column" gap={4}>
          <Flex align="center" justify="space-between">
            <Text fontWeight="semibold" fontSize="sm">
              {selectedRole.name}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {permissionIds.length} / {MOCK_PERMISSIONS.length} quyền được bật
            </Text>
          </Flex>

          <Stack gap={3}>
            {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
              <PermissionGroup
                key={group}
                group={group}
                permissions={perms}
                hasPermission={hasPermission}
                onToggle={togglePermission}
                onToggleGroup={toggleGroup}
              />
            ))}
          </Stack>
        </Flex>
      </Grid>
    </Flex>
  );
}
