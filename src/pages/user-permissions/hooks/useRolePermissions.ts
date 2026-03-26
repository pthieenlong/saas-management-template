import { useState } from "react";
import { MOCK_ROLES, MOCK_PERMISSIONS, type Role } from "@lib/mock/companies";

export function useRolePermissions() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(MOCK_ROLES[0].id);
  // map roleId → permissionIds (mutable copy)
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>(
    Object.fromEntries(MOCK_ROLES.map((r) => [r.id, [...r.permissionIds]]))
  );

  const selectedRole: Role = MOCK_ROLES.find((r) => r.id === selectedRoleId) ?? MOCK_ROLES[0];
  const permissionIds = rolePermissions[selectedRoleId] ?? [];

  const hasPermission = (permId: string) => permissionIds.includes(permId);

  const togglePermission = (permId: string) => {
    setRolePermissions((prev) => {
      const current = prev[selectedRoleId] ?? [];
      const next = current.includes(permId)
        ? current.filter((p) => p !== permId)
        : [...current, permId];
      return { ...prev, [selectedRoleId]: next };
    });
  };

  const toggleGroup = (permIds: string[]) => {
    const allOn = permIds.every((p) => hasPermission(p));
    setRolePermissions((prev) => {
      const current = prev[selectedRoleId] ?? [];
      const next = allOn
        ? current.filter((p) => !permIds.includes(p))
        : Array.from(new Set([...current, ...permIds]));
      return { ...prev, [selectedRoleId]: next };
    });
  };

  return {
    roles: MOCK_ROLES,
    allPermissions: MOCK_PERMISSIONS,
    selectedRoleId,
    selectedRole,
    permissionIds,
    rolePermissions,
    setSelectedRoleId,
    hasPermission,
    togglePermission,
    toggleGroup,
  };
}
