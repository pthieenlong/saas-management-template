import { useCurrentUserStore } from "@store/useCurrentUserStore";

export function useCurrentUser() {
  const { currentUser, switchUser } = useCurrentUserStore();
  return {
    currentUser,
    switchUser,
    isAdmin: currentUser.roleId === "role-admin",
    isManager: currentUser.roleId === "role-manager",
    isStaff:
      currentUser.roleId === "role-cashier" ||
      currentUser.roleId === "role-warehouse",
  };
}
