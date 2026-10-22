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
  const { pathname } = useLocation();
  const inConsole = pathname.split("/").includes("dashboard");
  if (!isLocale(locale)) return <Navigate to="/fr" replace />;
  return (
    <I18nProvider>
      <DocumentMeta />
      <ScrollOnNavigate />
      <div className={inConsole ? "min-h-dvh" : "flex min-h-screen flex-col"}>
        {inConsole ? null : <Header />}
        <main className={inConsole ? "min-h-dvh" : "flex-1"}>
          <Outlet />
        </main>
        {inConsole ? null : <Footer />}
      </div>
    </I18nProvider>
  );
}
