import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { I18nProvider, useI18n } from "@/i18n";
import { STORAGE_KEY, isLocale } from "@/i18n/locales";
import Footer from "./Footer";
import Header from "./Header";

function DocumentLang() {
  const { locale, m } = useI18n();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.title = m.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", m.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, m]);
  return null;
}

export default function Shell() {
  const { locale } = useParams();
  if (!isLocale(locale)) return <Navigate to="/fr" replace />;
  return (
    <I18nProvider>
      <DocumentLang />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
