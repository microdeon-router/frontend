export type Locale = "fr" | "en" | "es" | "de" | "zh" | "hi" | "id" | "pt" | "ar" | "bn" | "ru" | "ja";

export const locales: {
  code: Locale;
  native: string;
  region: string;
}[] = [
  { code: "fr", native: "Français", region: "FR" },
  { code: "en", native: "English", region: "US" },
  { code: "zh", native: "中文", region: "CN" },
  { code: "hi", native: "हिन्दी", region: "IN" },
  { code: "id", native: "Bahasa Indonesia", region: "ID" },
  { code: "pt", native: "Português", region: "BR" },
  { code: "es", native: "Español", region: "ES" },
  { code: "ar", native: "العربية", region: "AR" },
  { code: "bn", native: "বাংলা", region: "BD" },
  { code: "ru", native: "Русский", region: "RU" },
  { code: "ja", native: "日本語", region: "JP" },
  { code: "de", native: "Deutsch", region: "DE" },
];

export const defaultLocale: Locale = "fr";
export const STORAGE_KEY = "microdeon.locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((item) => item.code === value);
}

export function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored ?? "")) return stored as Locale;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator === "undefined" ? "" : navigator.language.slice(0, 2).toLowerCase();
  return isLocale(nav) ? nav : defaultLocale;
}
