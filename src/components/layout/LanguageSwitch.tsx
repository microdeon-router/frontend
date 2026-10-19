import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadMessages, useI18n } from "@/i18n";
import { STORAGE_KEY, locales, type Locale } from "@/i18n/locales";
import { swapLocale } from "@/seo/site";

export default function LanguageSwitch() {
  const { locale, m } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const current = locales.find((item) => item.code === locale)!;

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const remember = (code: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 items-center gap-1 border border-line px-2 font-mono text-[12px] text-mute hover:border-[#333] hover:text-white"
      >
        <span id={labelId} className="sr-only">
          {m.lang.label}
        </span>
        <span className="text-faint">[</span>
        <span className="uppercase tracking-wide text-[#c8c8c8]">{current.code}</span>
        <span className="text-faint">]</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={m.lang.label}
          className="absolute end-0 z-50 mt-1 w-52 overflow-hidden border border-line bg-panel py-1 font-mono shadow-2xl"
        >
          {locales.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === locale}>
              <Link
                to={swapLocale(location.pathname, location.search, location.hash, item.code)}
                hrefLang={item.code}
                onMouseEnter={() => void loadMessages(item.code)}
                onFocus={() => void loadMessages(item.code)}
                onClick={() => remember(item.code)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] ${
                  item.code === locale ? "bg-white/5 text-white" : "text-[#c8c8c8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.native}</span>
                <span className="font-mono text-[11px] uppercase text-mute">{item.code}</span>
              </Link>
            </li>
          ))}
          <li className="border-t border-line px-3 py-2 text-[11px] leading-snug text-faint">{m.lang.hint}</li>
        </ul>
      ) : null}
    </div>
  );
}
