/**
 * SCHEMA DE TOKENS
 *
 * Define quais variáveis de cor existem no projeto.
 * Isso só muda quando você quer adicionar/remover uma
 * categoria de cor nova (ex: "success", "danger").
 *
 * Para criar um NOVO TEMA, você não precisa tocar aqui —
 * basta adicionar uma entrada em `themes`, mais abaixo.
 */

const tokenSchema = [
    "background",
    "foreground",
    "border",

    "primary-100", "primary-300", "primary-500", "primary-700", "primary-900",
    "secondary-100", "secondary-300", "secondary-500", "secondary-700", "secondary-900",
    "muted-100", "muted-200", "muted-300", "muted-400",
    "muted-500", "muted-600", "muted-700", "muted-800", "muted-900",
] as const;

export type TokenKey = (typeof tokenSchema)[number];

export type ThemeTokens = Record<TokenKey, string>;

export const themeTokenKeys: readonly TokenKey[] = tokenSchema;

/**
 * REGISTRO DE TEMAS
 *
 * Cada entrada aqui é um tema completo. Basta seguir o
 * schema acima (TypeScript vai avisar se faltar alguma cor).
 *
 * Para criar um tema novo, copie um bloco existente,
 * troque os valores e dê um nome novo à chave.
 */
export const themes = {
    light: {
        background: "#ffffff",
        foreground: "#17171b",
        border: "#e8e8ea",

        "primary-100": "#e6f0ff",
        "primary-300": "#8ab8ff",
        "primary-500": "#2f6fed",
        "primary-700": "#1d4bb0",
        "primary-900": "#102a63",

        "secondary-100": "#fdeee6",
        "secondary-300": "#f4b58a",
        "secondary-500": "#e9772f",
        "secondary-700": "#b3541b",
        "secondary-900": "#6b310e",

        "muted-100": "#f5f5f6",
        "muted-200": "#e8e8ea",
        "muted-300": "#d3d3d7",
        "muted-400": "#b0b0b7",
        "muted-500": "#8a8a93",
        "muted-600": "#6b6b74",
        "muted-700": "#4d4d55",
        "muted-800": "#2f2f36",
        "muted-900": "#17171b",
    },

    dark: {
        background: "#17171b",
        foreground: "#f5f5f6",
        border: "#4d4d55",

        "primary-100": "#102a63",
        "primary-300": "#8ab8ff",
        "primary-500": "#2f6fed",
        "primary-700": "#1d4bb0",
        "primary-900": "#e6f0ff",

        "secondary-100": "#6b310e",
        "secondary-300": "#f4b58a",
        "secondary-500": "#e9772f",
        "secondary-700": "#b3541b",
        "secondary-900": "#fdeee6",

        "muted-100": "#17171b",
        "muted-200": "#2f2f36",
        "muted-300": "#4d4d55",
        "muted-400": "#6b6b74",
        "muted-500": "#8a8a93",
        "muted-600": "#b0b0b7",
        "muted-700": "#d3d3d7",
        "muted-800": "#e8e8ea",
        "muted-900": "#f5f5f6",
    },
} as const satisfies Record<string, ThemeTokens>;

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as ThemeName[];

export const defaultTheme: ThemeName = "light";