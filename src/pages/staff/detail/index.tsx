import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  // Tab,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@routes/staff/$staffId";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PermissionGroup } from "@components/PermissionGroup";
import { useStaffDetail } from "./hooks/useStaffDetail";
import { StaffInfoForm } from "./components/StaffInfoForm";
import { StaffRoleSelect } from "./components/StaffRoleSelect";
import {
  staffInfoSchema,
  type StaffInfoValues,
} from "./schemas/staffInfoSchema";
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

export function StaffDetailPage() {
  const { staffId } = Route.useParams();
  const navigate = useNavigate();
  const detail = useStaffDetail(staffId);

  const form = useForm<StaffInfoValues>({
    resolver: zodResolver(staffInfoSchema),
    values: detail
      ? {
          name: detail.name,
          email: detail.email,
          branchId: detail.branchId,
          isActive: detail.isActive,
        }
      : undefined,
  });

  if (!detail) {
    return (
      <Flex
        align="center"
        justify="center"
        h="300px"
        color="fg.muted"
        direction="column"
        gap={3}
      >
        <Spinner />
        <Text fontSize="sm">Không tìm thấy nhân viên</Text>
      </Flex>
    );
  }

  const onSubmit = (values: StaffInfoValues) => {
    detail.setName(values.name);
    detail.setEmail(values.email);
    detail.setBranchId(values.branchId);
    detail.setIsActive(values.isActive);
  };

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap={5}>
        {/* Header */}
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/staff" })}
            >
              <ArrowLeft size={16} />
            </Button>
            <Avatar.Root size="sm" colorPalette="blue">
              <Avatar.Fallback name={detail.name} />
            </Avatar.Root>
            <Box>
              <Heading size="md">{detail.name}</Heading>
              <Text fontSize="xs" color="fg.muted">
                {detail.email}
              </Text>
            </Box>
          </Flex>
          <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
            <Save size={14} />
            Lưu thay đổi
          </Button>
        </Flex>

        {/* Tabs */}
        <Tabs.Root defaultValue="info" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="info">Thông tin</Tabs.Trigger>
            <Tabs.Trigger value="permissions">Quyền hạn</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="info" pt={4}>
            <Stack gap={4} maxW="480px">
              <StaffInfoForm allBranches={detail.allBranches} />
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="permissions" pt={4}>
            <Stack gap={4} maxW="640px">
              <StaffRoleSelect
                roleId={detail.roleId}
                role={detail.role}
                allRoles={detail.allRoles}
                effectivePermissionCount={detail.effectivePermissionIds.length}
                onAssignRole={detail.assignRole}
              />
              {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                <PermissionGroup
                  key={group}
                  group={group}
                  permissions={perms}
                  hasPermission={detail.hasPermission}
                  isFromRole={detail.isFromRole}
                  isRevoked={detail.isRevoked}
                  onToggle={detail.togglePermission}
                  onToggleGroup={detail.toggleGroup}
                />
              ))}
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </FormProvider>
  );
}
