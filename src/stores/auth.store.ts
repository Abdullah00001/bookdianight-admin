import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  adminData: any | null;
  csrfToken: string | null;
  setAuth: (data: any, csrfToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminData: null,
      csrfToken: null,
      setAuth: (adminData, csrfToken) => set({ isAuthenticated: true, adminData, csrfToken }),
      clearAuth: () => set({ isAuthenticated: false, adminData: null, csrfToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
