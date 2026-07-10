import { create } from "zustand";

import type { ExampleState } from "./example.types";

interface ExampleStore
    extends ExampleState {
    select(
        id: string
    ): void;

    clear(): void;
}



export const useExampleStore = create<ExampleStore>((set) => ({

    selectedId: null,

    select(id) {
        set({ selectedId: id });
    },

    clear() {
        set({ selectedId: null });
    }
}));