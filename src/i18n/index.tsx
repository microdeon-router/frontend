import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { interpolate, type Messages } from "./messages";
import { defaultLocale, isLocale, messages, type Locale } from "./locales";

type I18n = {
  locale: Locale;
  t: (pick: (m: Messages) => string, vars?: Record<string, string | number>) => string;
  m: Messages;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale: raw } = useParams();
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const value = useMemo<I18n>(() => {
    const bundle = messages[locale];
    return {
      locale,
      m: bundle,
      t: (pick, vars) => interpolate(pick(bundle), vars),
    };
  }, [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}

export function localePath(locale: Locale, path = "") {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${suffix}`;
}
