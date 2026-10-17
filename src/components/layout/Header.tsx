import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "@/components/brand/Mark";
import Button from "@/components/ui/Button";
import { localePath, useI18n } from "@/i18n";
import { authClient } from "@/lib/auth-client";
import CommandSearch from "./CommandSearch";
import LanguageSwitch from "./LanguageSwitch";

export default function Header() {
  const { locale, m } = useI18n();
  const { data: session } = authClient.useSession();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { to: localePath(locale, "/models"), label: m.nav.models },
    { to: localePath(locale, "/docs"), label: m.nav.docs },
    { to: localePath(locale, "/dashboard"), label: m.nav.dashboard },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-4 px-4 sm:px-6">
        <Link to={localePath(locale)} className="shrink-0" aria-label="Microdeon">
          <Wordmark className="h-8 w-auto" />
        </Link>

        <nav className="ml-4 hidden items-center gap-6 lg:flex" aria-label="Sections">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[14px] ${isActive ? "text-white" : "text-[#b0b0b0] hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="ml-2 hidden h-9 w-44 items-center gap-2 rounded-lg border border-line bg-raised px-3 text-left text-[13px] text-mute md:flex"
        >
          <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M12.5 12.5 17 17" strokeLinecap="round" />
          </svg>
          <span className="flex-1">{m.nav.search}</span>
          <kbd className="rounded border border-line px-1.5 py-0.5 font-sans text-[10px]">Ctrl K</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          {session ? (
            <button
              type="button"
              className="hidden text-[13.5px] text-[#d0d0d0] hover:text-white md:inline"
              onClick={() => void authClient.signOut()}
            >
              {m.nav.signOut}
            </button>
          ) : (
            <Button variant="ghost" to={localePath(locale, "/signin")} className="hidden md:inline-flex">
              {m.nav.signin}
            </Button>
          )}
          <Button
            to={localePath(locale, session ? "/dashboard" : "/signup")}
            className="whitespace-nowrap px-3 text-[13px] sm:px-4 sm:text-[13.5px]"
          >
            {session ? m.nav.goToConsole : m.nav.getKey}
          </Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-[#d0d0d0] hover:bg-white/5 lg:hidden"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? m.nav.close : "Menu"}</span>
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line px-4 py-3 lg:hidden">
          <nav className="flex flex-col">
            {links.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-md px-2 py-2.5 text-sm text-[#d0d0d0]">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button
                type="button"
                className="rounded-md px-2 py-2.5 text-left text-sm text-[#d0d0d0] sm:hidden"
                onClick={() => void authClient.signOut()}
              >
                {m.nav.signOut}
              </button>
            ) : (
              <Link to={localePath(locale, "/signin")} className="rounded-md px-2 py-2.5 text-sm text-[#d0d0d0] sm:hidden">
                {m.nav.signin}
              </Link>
            )}
          </nav>
        </div>
      ) : null}

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
