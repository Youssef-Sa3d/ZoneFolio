import { create } from "zustand";


interface UserState {
    id: string | null;
    username: string | null;
    name: string | null;
    email: string | null;
    setUser: (user: { id: string; username: string; name: string; email: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: null,
    username: null,
    name: null,
    email: null,
    setUser: (user) => {
        if (user) {
            set({ id: user.id, username: user.username, name: user.name, email: user.email });
        } else {
            set({ id: null, username: null, name: null, email: null });
        }
    },
}));