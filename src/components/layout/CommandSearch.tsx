import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { models } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import { useAuthSession } from "@/lib/session";

type CommandSearchProps = { open: boolean; onClose: () => void };

export default function CommandSearch({ open, onClose }: CommandSearchProps) {
  const { locale, m } = useI18n();
  const { signedIn } = useAuthSession();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const pages = useMemo(
    () => [
      { href: localePath(locale), label: "Microdeon", group: m.search.pages },
      { href: localePath(locale, "/models"), label: m.nav.models, group: m.search.pages },
      { href: localePath(locale, "/docs"), label: m.nav.docs, group: m.search.pages },
      {
        href: localePath(locale, signedIn ? "/dashboard" : "/signin"),
        label: m.nav.dashboard,
        group: m.search.pages,
      },
      { href: localePath(locale, "/signin"), label: m.nav.signin, group: m.search.pages },
    ],
    [locale, m, signedIn],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pageHits = pages.filter((p) => p.label.toLowerCase().includes(q));
    const modelHits = models
      .filter((model) => !q || `${model.id} ${model.displayName}`.toLowerCase().includes(q))
      .map((model) => ({
        href: localePath(locale, `/models/${model.slug}`),
        label: model.id,
        group: m.search.models,
      }));
    return [...pageHits, ...modelHits];
  }, [query, pages, locale, m.search.models]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]">
      <button type="button" aria-label={m.nav.close} className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={m.nav.search}
        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-panel shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              go(results[active].href);
            }
          }}
          placeholder={m.search.placeholder}
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-[15px] text-white outline-none placeholder:text-faint"
        />
        <ul className="max-h-80 overflow-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-mute">{m.search.empty}</li>
          ) : (
            results.map((entry, index) => (
              <li key={entry.href + entry.label}>
                <button
                  type="button"
                  onClick={() => go(entry.href)}
                  className={`flex w-full items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${
                    index === active ? "bg-white/6 text-white" : "text-[#c6c6c6]"
                  }`}
                >
                  <span className="font-mono text-[13px]">{entry.label}</span>
                  <span className="text-[11px] text-faint">{entry.group}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
