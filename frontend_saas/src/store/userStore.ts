import { create } from "zustand";


interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    setUser: (user: { id: string; name: string; email: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    name: null,
    email: null,
    setUser: (user) => {
        if (user) {
            set({ id: user.id, name: user.name, email: user.email });
        } else {
            set({ id: null, name: null, email: null });
        }
    },
}));