import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, KeyRound, Save } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@routes/staff/$staffId";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PermissionGroup } from "@components/PermissionGroup";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { MOCK_PERMISSIONS } from "@lib/mock/companies";
import { useStaffDetail } from "./hooks/useStaffDetail";
import { useSalary } from "./hooks/useSalary";
import { StaffInfoForm } from "./components/StaffInfoForm";
import { StaffRoleSelect } from "./components/StaffRoleSelect";
import { StaffDangerZone } from "./components/StaffDangerZone";
import { ResetPasswordModal } from "./components/ResetPasswordModal";
import { SalaryTable } from "./components/SalaryTable";
import { SalaryDetailModal } from "./components/SalaryDetailModal";
import {
  staffInfoSchema,
  type StaffInfoValues,
} from "./schemas/staffInfoSchema";

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
  const salary = useSalary(staffId);
  const { currentUser, isAdmin, isManager, isStaff } = useCurrentUser();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const isOwnProfile = currentUser.id === staffId;

  const form = useForm<StaffInfoValues>({
    resolver: zodResolver(staffInfoSchema),
    values: detail
      ? {
          name: detail.name,
          email: detail.email,
          phone: detail.phone,
          branchId: detail.branchId,
          joinDate: detail.joinDate,
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
    detail.setPhone(values.phone);
    detail.setBranchId(values.branchId);
    detail.setJoinDate(values.joinDate);
    detail.setIsActive(values.isActive);
  };

  const infoFormProps = {
    allBranches: detail.allBranches,
    avatar: detail.avatar,
    canEditName: isAdmin || isManager,
    canEditEmail: isAdmin,
    canEditPhone: isAdmin || isManager || isOwnProfile,
    canEditBranch: isAdmin,
    canEditJoinDate: isAdmin,
    canEditStatus: isAdmin || isManager,
    canEditAvatar: isAdmin || isOwnProfile,
    onAvatarChange: (file: File) => {
      const url = URL.createObjectURL(file);
      detail.setAvatar(url);
    },
  };

  const passwordModalMode = isOwnProfile && isStaff ? "change" : "reset";
  const showPasswordButton = isAdmin || isManager || (isStaff && isOwnProfile);
  const showSaveButton = !isStaff || isOwnProfile;
  const showPermissionsTab = isAdmin;
  const showSalaryTab = isAdmin || isManager;

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
            <Avatar.Root size="sm" colorPalette="primary">
              <Avatar.Image src={detail.avatar ?? "https://placehold.co/32x32"} />
              <Avatar.Fallback name={detail.name} />
            </Avatar.Root>
            <Box>
              <Heading size="md">{detail.name}</Heading>
              <Text fontSize="xs" color="fg.muted">
                {detail.email}
              </Text>
            </Box>
          </Flex>
          <Flex gap={2}>
            {showPasswordButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <KeyRound size={14} />
                {isOwnProfile && isStaff ? "Đổi mật khẩu" : "Đặt lại mật khẩu"}
              </Button>
            )}
            {showSaveButton && (
              <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                <Save size={14} />
                Lưu thay đổi
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Tabs */}
        <Tabs.Root defaultValue="info" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="info">Thông tin</Tabs.Trigger>
            {showSalaryTab && (
              <Tabs.Trigger value="salary">Bảng lương</Tabs.Trigger>
            )}
            {showPermissionsTab && (
              <Tabs.Trigger value="permissions">Quyền hạn</Tabs.Trigger>
            )}
          </Tabs.List>

          <Tabs.Content value="info" pt={4}>
            <Stack gap={4} maxW="480px">
              <StaffInfoForm {...infoFormProps} />
              {isAdmin && (
                <StaffDangerZone
                  staffName={detail.name}
                  onDelete={() => navigate({ to: "/staff" })}
                />
              )}
            </Stack>
          </Tabs.Content>

          {showSalaryTab && salary && (
            <Tabs.Content value="salary" pt={4}>
              <Box
                bg="bg.surface"
                borderWidth="1px"
                borderColor="border.muted"
                borderRadius="lg"
                overflow="hidden"
              >
                <SalaryTable
                  records={salary.records}
                  onView={salary.selectRecord}
                />
              </Box>
              <SalaryDetailModal
                record={salary.selected}
                onClose={salary.clearSelection}
                onUpdateStatus={salary.updateStatus}
                canEdit={isAdmin}
              />
            </Tabs.Content>
          )}

          {showPermissionsTab && (
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
          )}
        </Tabs.Root>
      </Flex>

      <ResetPasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        mode={passwordModalMode}
      />
    </FormProvider>
  );
}
