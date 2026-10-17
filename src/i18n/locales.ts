import type { Messages } from "./messages";
import { fr } from "./locales/fr";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { de } from "./locales/de";

export type Locale = "fr" | "en" | "es" | "de";

export const locales: {
  code: Locale;
  native: string;
  region: string;
}[] = [
  { code: "fr", native: "Français", region: "FR" },
  { code: "en", native: "English", region: "US" },
  { code: "es", native: "Español", region: "ES" },
  { code: "de", native: "Deutsch", region: "DE" },
];

export const messages: Record<Locale, Messages> = { fr, en, es, de };

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
