import type {
    ThemeName,
} from "@/config/themes";

export type Theme = ThemeName;

export interface PreferencesState {
    theme: Theme;
}