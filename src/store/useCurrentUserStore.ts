import { create } from "zustand";
import type { User } from "@lib/mock/companies";
import { MOCK_USERS } from "@lib/mock/companies";

type CurrentUserState = {
  currentUser: User;
  switchUser: (userId: string) => void;
};

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  // Default to user-admin for dev testing (Admin view)
  currentUser: MOCK_USERS[0],
  switchUser: (userId) => {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
  },
}));
