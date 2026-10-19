import DocumentMeta from "@/components/seo/DocumentMeta";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { I18nProvider, localePath, useI18n } from "@/i18n";
import { defaultLocale } from "@/i18n/locales";

export default function NotFound() {
  const { locale, m } = useI18n();
  return (
    <div className="mx-auto max-w-[520px] px-4 py-28 text-center">
      <p className="font-mono text-signal">404</p>
      <h1 className="mt-4 text-[2rem] font-semibold tracking-tight text-white">{m.notFound.title}</h1>
      <p className="mt-3 text-mute">{m.notFound.body}</p>
      <Button to={localePath(locale)} className="mt-8">
        {m.notFound.home}
      </Button>
    </div>
  );
}

/** URL hors préfixe de langue : 404, pas une redirection vers l’accueil. */
export function UnknownRoute() {
  return (
    <I18nProvider locale={defaultLocale}>
      <DocumentMeta />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <NotFound />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
