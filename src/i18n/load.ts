import type { Locale } from "./locales";
import type { Messages } from "./messages";

const loaders: Record<Locale, () => Promise<Messages>> = {
  fr: () => import("./locales/fr").then((mod) => mod.fr),
  en: () => import("./locales/en").then((mod) => mod.en),
  es: () => import("./locales/es").then((mod) => mod.es),
  de: () => import("./locales/de").then((mod) => mod.de),
  zh: () => import("./locales/zh").then((mod) => mod.zh),
  hi: () => import("./locales/hi").then((mod) => mod.hi),
  id: () => import("./locales/id").then((mod) => mod.id),
  pt: () => import("./locales/pt").then((mod) => mod.pt),
  ar: () => import("./locales/ar").then((mod) => mod.ar),
  bn: () => import("./locales/bn").then((mod) => mod.bn),
  ru: () => import("./locales/ru").then((mod) => mod.ru),
  ja: () => import("./locales/ja").then((mod) => mod.ja),
};

const cache = new Map<Locale, Promise<Messages>>();

export function loadMessages(locale: Locale): Promise<Messages> {
  const cached = cache.get(locale);
  if (cached) return cached;
  const pending = loaders[locale]();
  cache.set(locale, pending);
  return pending;
}
