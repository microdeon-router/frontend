import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadMessages } from "./load";
import { interpolate, type Messages } from "./messages";
import { defaultLocale, isLocale, type Locale } from "./locales";

type I18n = {
  locale: Locale;
  t: (pick: (m: Messages) => string, vars?: Record<string, string | number>) => string;
  m: Messages;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({
  children,
  locale: forced,
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const { locale: raw } = useParams();
  const locale: Locale = forced ?? (isLocale(raw) ? raw : defaultLocale);
  const [value, setValue] = useState<I18n | null>(null);

  useEffect(() => {
    let live = true;
    loadMessages(locale).then(
      (bundle) => {
        if (!live) return;
        setValue({
          locale,
          m: bundle,
          t: (pick, vars) => interpolate(pick(bundle), vars),
        });
      },
      () => {},
    );
    return () => {
      live = false;
    };
  }, [locale]);

  if (!value) return null;
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export { loadMessages };

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}

export function localePath(locale: Locale, path = "") {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${suffix}`;
}
