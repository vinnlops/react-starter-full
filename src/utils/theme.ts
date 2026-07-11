import { themes, themeTokenKeys, defaultTheme, type ThemeName } from "@/config/themes";
import { usePreferencesStore } from "@/store";

const STORAGE_KEY = "app-theme";

/**
 * Aplica um tema iterando sobre o schema de tokens.
 * Não precisa ser alterada ao criar novos temas OU
 * novos tokens — ela lê tudo dinamicamente.
 */
export function applyTheme(theme: ThemeName): void {
    const tokens = themes[theme] ?? themes[defaultTheme];
    const root = document.documentElement;

    root.dataset.theme = theme;

    for (const key of themeTokenKeys) {
        root.style.setProperty(`--color-${key}`, tokens[key]);
    }

    localStorage.setItem(STORAGE_KEY, theme);
}

export function getTheme(): ThemeName {
    const current = document.documentElement.dataset.theme as ThemeName | undefined;
    return current ?? getStoredTheme() ?? defaultTheme;
}

export function changeTheme(theme: ThemeName) {
    applyTheme(theme);
    usePreferencesStore.getState().setTheme(theme);
}

function getStoredTheme(): ThemeName | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored in themes ? (stored as ThemeName) : null;
}

/**
 * Chamar uma vez, o quanto antes (main.tsx), para aplicar
 * o tema salvo antes da primeira renderização.
 */
export function initTheme(): void {
    applyTheme(getStoredTheme() ?? defaultTheme);
}