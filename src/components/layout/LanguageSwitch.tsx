import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
import { STORAGE_KEY, locales, type Locale } from "@/i18n/locales";

export default function LanguageSwitch() {
  const { locale, m } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
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

  const switchTo = (code: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    const parts = location.pathname.split("/");
    parts[1] = code;
    navigate(parts.join("/") + location.search + location.hash);
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
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-2.5 text-[12.5px] text-[#c8c8c8] hover:border-[#333] hover:text-white"
      >
        <span id={labelId} className="sr-only">
          {m.lang.label}
        </span>
        <span className="font-mono uppercase tracking-wide">{current.code}</span>
        <svg viewBox="0 0 12 12" className="size-2.5 text-mute" aria-hidden="true">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={m.lang.label}
          className="absolute end-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border border-line bg-panel py-1 shadow-2xl"
        >
          {locales.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === locale}>
              <button
                type="button"
                onClick={() => switchTo(item.code)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13px] ${
                  item.code === locale ? "bg-white/5 text-white" : "text-[#c8c8c8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.native}</span>
                <span className="font-mono text-[11px] uppercase text-mute">{item.code}</span>
              </button>
            </li>
          ))}
          <li className="border-t border-line px-3 py-2 text-[11px] leading-snug text-faint">{m.lang.hint}</li>
        </ul>
      ) : null}
    </div>
  );
}
