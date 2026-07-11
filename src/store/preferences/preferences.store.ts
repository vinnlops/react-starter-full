import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PreferencesState, Theme } from "./preferences.types";
import { defaultTheme } from "@/config/themes";
import { applyTheme } from "@/utils/theme";

interface PreferencesStore extends PreferencesState {
    setTheme(theme: Theme): void;
}

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({

            theme: defaultTheme,

            setTheme(theme) {

                applyTheme(theme);

                set({
                    theme,
                });

            },

        }),
        {
            name: "preferences-storage",
        }
    )
);