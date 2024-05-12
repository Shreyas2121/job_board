import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Auth = {
  user: User | null;

  setUser: ({ user }: { user: User | null }) => void;

  logout: () => void;
};

export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      user: null,

      setUser({ user }) {
        set({
          user,
        });
      },

      logout() {
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
