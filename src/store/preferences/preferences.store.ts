import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PreferencesState, Theme } from "./preferences.types";

interface PreferencesStore extends PreferencesState {
    setTheme(theme: Theme): void;
}

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({
            theme: "system",

            setTheme(theme) {
                set({ theme });
            },
        }),
        {
            name: "preferences-storage",
        }
    )
);