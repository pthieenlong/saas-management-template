import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Save, GitBranch } from "lucide-react";
import { MOCK_COMPANY_TREE, MOCK_PERMISSIONS, MOCK_ROLES } from "@lib/mock/companies";
import { useUserPermissions } from "./hooks/useUserPermissions";
import { StaffList } from "./components/StaffList";
import { PermissionGroup } from "./components/PermissionGroup";
import { CompanyTree } from "@pages/companies/components/CompanyTree";
import type { Company } from "@lib/mock/companies";

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
    selectedBranch,
    setSelectedBranch,
    branchUsers,
    selectedUserId,
    setSelectedUserId,
    selectedStaff,
    userRoles,
    roles,
    assignRole,
    togglePermission,
    isFromRole,
    isRevoked,
    hasPermission,
  } = useUserPermissions();

  const handleTreeSelect = (company: Company) => {
    if (company.type === "branch") {
      setSelectedBranch(company);
      setSelectedUserId(null);
    }
  };


  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Phân quyền người dùng</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Chọn chi nhánh → nhân viên → gán Role và quyền bổ sung
          </Text>
        </Box>
        <Button disabled={!selectedStaff}>
          <Save />
          Lưu thay đổi
        </Button>
      </Flex>

      <Grid templateColumns="260px 1fr" gap={5} alignItems="start">
        {/* Left: Company tree */}
        <Flex direction="column" gap={4}>
          <Box
            bg="bg.panel"
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="lg"
            overflow="hidden"
          >
            <Flex px={4} py={3} borderBottomWidth="1px" borderColor="border.subtle">
              <Text fontWeight="semibold" fontSize="sm">
                Cơ cấu tổ chức
              </Text>
            </Flex>
            <Box py={2}>
              <CompanyTree
                companies={MOCK_COMPANY_TREE}
                selectedId={selectedBranch?.id}
                onSelect={handleTreeSelect}
              />
            </Box>
          </Box>

          {selectedBranch && (
            <StaffList
              users={branchUsers}
              roles={roles}
              userRoleMap={userRoles}
              selectedUserId={selectedUserId}
              onSelect={setSelectedUserId}
            />
          )}
        </Flex>

        {/* Right: permission panel */}
        {!selectedBranch && (
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap={3}
            h="300px"
            color="fg.muted"
          >
            <GitBranch size={32} />
            <Text fontSize="sm">Chọn một chi nhánh để xem nhân viên</Text>
          </Flex>
        )}

        {selectedBranch && !selectedStaff && (
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap={3}
            h="300px"
            color="fg.muted"
          >
            <Text fontSize="sm">Chọn nhân viên để phân quyền</Text>
          </Flex>
        )}

        {selectedStaff && (
          <Flex direction="column" gap={4}>
            {/* User info + role selector */}
            <Box
              bg="bg.panel"
              borderWidth="1px"
              borderColor="border.subtle"
              borderRadius="lg"
              p={4}
            >
              <Flex align="center" gap={3} mb={4}>
                <Text fontWeight="semibold" fontSize="sm">
                  {selectedStaff.user.name}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {selectedStaff.user.email}
                </Text>
                <Badge colorPalette="gray" size="sm" ml="auto">
                  {selectedStaff.effectivePermissionIds.length} quyền hiệu lực
                </Badge>
              </Flex>

              <Flex align="center" gap={3}>
                <Text fontSize="sm" fontWeight="medium" flexShrink={0}>
                  Role:
                </Text>
                <NativeSelect.Root flex={1}>
                  <NativeSelect.Field
                    value={selectedStaff.role.id}
                    onChange={(e) => assignRole(selectedStaff.user.id, e.target.value)}
                  >
                    {MOCK_ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Text fontSize="xs" color="fg.muted" flexShrink={0}>
                  {selectedStaff.role.permissionIds.length} quyền mặc định
                </Text>
              </Flex>
            </Box>

            {/* Permission groups */}
            <Stack gap={3}>
              {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                <PermissionGroup
                  key={group}
                  group={group}
                  permissions={perms}
                  hasPermission={hasPermission}
                  isFromRole={isFromRole}
                  isRevoked={isRevoked}
                  onToggle={togglePermission}
                />
              ))}
            </Stack>
          </Flex>
        )}
      </Grid>
    </Flex>
  );
}
