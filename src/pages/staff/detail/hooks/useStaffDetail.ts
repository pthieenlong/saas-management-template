import { useState } from "react";
import {
  MOCK_USERS,
  MOCK_ROLES,
  MOCK_PERMISSIONS,
  MOCK_BRANCHES,
} from "@lib/mock/companies";

export function useStaffDetail(staffId: string) {
  const user = MOCK_USERS.find((u) => u.id === staffId) ?? null;

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [avatar, setAvatar] = useState<string | null>(user?.avatar ?? null);
  const [branchId, setBranchId] = useState(user?.branchId ?? "");
  const [joinDate, setJoinDate] = useState(user?.joinDate ?? "");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  const [roleId, setRoleId] = useState(user?.roleId ?? "");
  const [extraPermissionIds, setExtraPermissionIds] = useState(user?.extraPermissionIds ?? []);
  const [revokedPermissionIds, setRevokedPermissionIds] = useState(user?.revokedPermissionIds ?? []);

  if (!user) return null;

  const role = MOCK_ROLES.find((r) => r.id === roleId) ?? MOCK_ROLES[0];
  const effectivePermissionIds = Array.from(
    new Set([
      ...role.permissionIds.filter((p) => !revokedPermissionIds.includes(p)),
      ...extraPermissionIds,
    ])
  );

  const assignRole = (newRoleId: string) => {
    setRoleId(newRoleId);
    // reset customizations when role changes
    setExtraPermissionIds([]);
    setRevokedPermissionIds([]);
  };

  const togglePermission = (permId: string) => {
    const isInRole = role.permissionIds.includes(permId);
    if (isInRole) {
      setRevokedPermissionIds((prev) =>
        prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
      );
    } else {
      setExtraPermissionIds((prev) =>
        prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
      );
    }
  };

  const hasPermission = (permId: string) => effectivePermissionIds.includes(permId);
  const isFromRole = (permId: string) =>
    role.permissionIds.includes(permId) && !revokedPermissionIds.includes(permId);
  const isRevoked = (permId: string) => revokedPermissionIds.includes(permId);

  const toggleGroup = (permIds: string[]) => {
    const allOn = permIds.every((p) => hasPermission(p));
    permIds.forEach((p) => {
      if (allOn ? hasPermission(p) : !hasPermission(p)) togglePermission(p);
    });
  };

  return {
    user,
    name, setName,
    email, setEmail,
    phone, setPhone,
    avatar, setAvatar,
    branchId, setBranchId,
    joinDate, setJoinDate,
    isActive, setIsActive,
    roleId,
    role,
    allRoles: MOCK_ROLES,
    allPermissions: MOCK_PERMISSIONS,
    allBranches: MOCK_BRANCHES,
    effectivePermissionIds,
    assignRole,
    togglePermission,
    toggleGroup,
    hasPermission,
    isFromRole,
    isRevoked,
  };
}
