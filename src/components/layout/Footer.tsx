import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wordmark } from "@/components/brand/Mark";
import { localePath, useI18n } from "@/i18n";
import { STORAGE_KEY, locales, type Locale } from "@/i18n/locales";

export default function Footer() {
  const { locale, m, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();

  const col = (title: string, items: { to: string; label: string }[]) => (
    <div>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-faint">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="text-[14px] text-[#b8b8b8] hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const switchTo = (code: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    const parts = location.pathname.split("/");
    parts[1] = code;
    navigate(parts.join("/") + location.search);
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Wordmark className="h-7 w-auto" />
          <p className="mt-4 max-w-[16rem] text-[13.5px] leading-relaxed text-mute">{m.footer.tagline}</p>
        </div>
        {col(m.footer.product, [
          { to: localePath(locale, "/models"), label: m.nav.models },
          { to: localePath(locale, "/docs"), label: m.nav.docs },
          { to: localePath(locale, "/dashboard"), label: m.nav.dashboard },
        ])}
        {col(m.footer.developers, [
          { to: localePath(locale, "/docs"), label: "OpenAI SDK" },
          { to: localePath(locale, "/docs#agents"), label: "Cursor / Claude Code" },
          { to: localePath(locale, "/models/cyberstrike-35b"), label: "cyberstrike-35b" },
        ])}
        {col(m.footer.company, [
          { to: localePath(locale, "/signin"), label: m.nav.signin },
          { to: localePath(locale, "/signup"), label: m.nav.signup },
        ])}
        {col(m.footer.legal, [
          { to: localePath(locale, "/docs#billing"), label: m.docs.billing },
          { to: localePath(locale, "/docs#errors"), label: m.docs.errors },
        ])}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-line px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[12.5px] text-faint">{t((msg) => msg.footer.copyright, { year })}</p>
        <ul className="flex flex-wrap gap-3">
          {locales.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                onClick={() => switchTo(item.code)}
                className={`font-mono text-[11px] uppercase tracking-wide ${
                  item.code === locale ? "text-white" : "text-faint hover:text-[#c8c8c8]"
                }`}
              >
                {item.code}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
