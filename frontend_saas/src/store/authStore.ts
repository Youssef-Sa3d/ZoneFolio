// store/authStore.ts
import { create } from "zustand";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
    setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:3001/auth/me", {
                withCredentials: true,
            });
            if (res.status === 200) {
                set({ isAuthenticated: true });
            } else {
                set({ isAuthenticated: false });
            }
        } catch {
            set({ isAuthenticated: false });
        }
    },
}));