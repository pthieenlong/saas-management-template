import { useState } from "react";
import {
  MOCK_USERS,
  MOCK_ROLES,
  MOCK_PERMISSIONS,
  type User,
  type Role,
  type Company,
} from "@lib/mock/companies";

export type SelectedStaff = {
  user: User;
  role: Role;
  effectivePermissionIds: string[];
};

export function useUserPermissions() {
  const [selectedBranch, setSelectedBranch] = useState<Company | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<Record<string, string>>(
    Object.fromEntries(MOCK_USERS.map((u) => [u.id, u.roleId]))
  );
  const [extraPermissions, setExtraPermissions] = useState<Record<string, string[]>>(
    Object.fromEntries(MOCK_USERS.map((u) => [u.id, u.extraPermissionIds]))
  );
  const [revokedPermissions, setRevokedPermissions] = useState<Record<string, string[]>>(
    Object.fromEntries(MOCK_USERS.map((u) => [u.id, u.revokedPermissionIds]))
  );

  const branchUsers = selectedBranch
    ? MOCK_USERS.filter((u) => u.branchId === selectedBranch.id)
    : [];

  const selectedStaff: SelectedStaff | null = (() => {
    if (!selectedUserId) return null;
    const user = MOCK_USERS.find((u) => u.id === selectedUserId);
    if (!user) return null;
    const roleId = userRoles[user.id] ?? user.roleId;
    const role = MOCK_ROLES.find((r) => r.id === roleId) ?? MOCK_ROLES[0];
    const extra = extraPermissions[user.id] ?? [];
    const revoked = revokedPermissions[user.id] ?? [];
    const effectivePermissionIds = Array.from(
      new Set([...role.permissionIds.filter((p) => !revoked.includes(p)), ...extra])
    );
    return { user, role, effectivePermissionIds };
  })();

  const assignRole = (userId: string, roleId: string) => {
    setUserRoles((prev) => ({ ...prev, [userId]: roleId }));
    // reset customizations when role changes
    setExtraPermissions((prev) => ({ ...prev, [userId]: [] }));
    setRevokedPermissions((prev) => ({ ...prev, [userId]: [] }));
  };

  const togglePermission = (permId: string) => {
    if (!selectedUserId) return;
    const roleId = userRoles[selectedUserId];
    const role = MOCK_ROLES.find((r) => r.id === roleId);
    const isInRole = role?.permissionIds.includes(permId) ?? false;

    if (isInRole) {
      // toggle revoke for role permissions
      setRevokedPermissions((prev) => {
        const current = prev[selectedUserId] ?? [];
        const next = current.includes(permId)
          ? current.filter((p) => p !== permId)
          : [...current, permId];
        return { ...prev, [selectedUserId]: next };
      });
    } else {
      // toggle extra for non-role permissions
      setExtraPermissions((prev) => {
        const current = prev[selectedUserId] ?? [];
        const next = current.includes(permId)
          ? current.filter((p) => p !== permId)
          : [...current, permId];
        return { ...prev, [selectedUserId]: next };
      });
    }
  };

  const isFromRole = (permId: string): boolean => {
    if (!selectedUserId) return false;
    const roleId = userRoles[selectedUserId];
    const inRole = MOCK_ROLES.find((r) => r.id === roleId)?.permissionIds.includes(permId) ?? false;
    const isRevoked = (revokedPermissions[selectedUserId] ?? []).includes(permId);
    return inRole && !isRevoked;
  };

  const isRevoked = (permId: string): boolean => {
    if (!selectedUserId) return false;
    return (revokedPermissions[selectedUserId] ?? []).includes(permId);
  };

  const hasPermission = (permId: string): boolean =>
    selectedStaff?.effectivePermissionIds.includes(permId) ?? false;

  const allPermissions = MOCK_PERMISSIONS;
  const roles = MOCK_ROLES;

  return {
    selectedBranch,
    setSelectedBranch,
    branchUsers,
    selectedUserId,
    setSelectedUserId,
    selectedStaff,
    userRoles,
    roles,
    allPermissions,
    assignRole,
    togglePermission,
    isFromRole,
    isRevoked,
    hasPermission,
  };
}
