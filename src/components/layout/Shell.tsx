import { useLayoutEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import DocumentMeta from "@/components/seo/DocumentMeta";
import { I18nProvider } from "@/i18n";
import { isLocale } from "@/i18n/locales";
import Footer from "./Footer";
import Header from "./Header";

function ScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function Shell() {
  const { locale } = useParams();
  if (!isLocale(locale)) return <Navigate to="/fr" replace />;
  return (
    <I18nProvider>
      <DocumentMeta />
      <ScrollOnNavigate />
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
