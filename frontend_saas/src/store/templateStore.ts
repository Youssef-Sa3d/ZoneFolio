import { create } from "zustand";
import axios from "axios";

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    demoUrl: string;
}

interface TemplateState {
    templates: Template[];
    loading: boolean;
    error: string | null;
    fetchTemplates: () => Promise<void>;
}

export const useTemplateStore = create<TemplateState>((set) => ({
    templates: [],
    loading: false,
    error: null,

    fetchTemplates: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get<Template[]>(
                "https://zonefolio-backend.up.railway.app/templates/"
            );
            set({ templates: data, loading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Failed to fetch templates",
                loading: false,
            });
        }
    },
}));