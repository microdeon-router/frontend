import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "@/components/brand/Mark";
import Button from "@/components/ui/Button";
import { localePath, useI18n } from "@/i18n";
import { authClient } from "@/lib/auth-client";
import { useAuthSession } from "@/lib/session";
import CommandSearch from "./CommandSearch";
import LanguageSwitch from "./LanguageSwitch";

function promptPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean).slice(1);
  return parts.length ? `~/${parts.join("/")}` : "~";
}

export default function Header() {
  const { locale, m } = useI18n();
  const { signedIn } = useAuthSession();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cwd = promptPath(location.pathname);

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
    { to: localePath(locale, "/models"), label: m.nav.models, cmd: "models" },
    { to: localePath(locale, "/docs"), label: m.nav.docs, cmd: "docs" },
    ...(signedIn ? [{ to: localePath(locale, "/dashboard"), label: m.nav.dashboard, cmd: "console" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 font-mono backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link to={localePath(locale)} className="flex min-w-0 shrink-0 items-center gap-3" aria-label="Microdeon">
          <Wordmark className="h-6 w-auto sm:h-7" />
          <span className="hidden min-w-0 items-center gap-1.5 text-[12px] text-mute md:flex">
            <span className="text-signal">$</span>
            <span className="truncate">{cwd}</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Sections">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                `inline-flex items-center px-2.5 py-1 text-[12.5px] lowercase tracking-tight ${
                  isActive ? "text-white" : "text-mute hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-signal" : "text-faint"}>{isActive ? ">" : "/"}</span>
                  {item.cmd}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="ml-1 hidden h-8 items-center gap-2 border border-line bg-panel px-2.5 text-left text-[12px] text-mute md:flex md:w-48 lg:w-56"
        >
          <span className="text-signal">$</span>
          <span className="flex-1 truncate">{m.nav.search}</span>
          <kbd className="border border-line px-1 py-px text-[10px] text-faint">^K</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          {signedIn ? (
            <button
              type="button"
              className="hidden text-[12.5px] lowercase text-mute hover:text-white md:inline"
              onClick={() => void authClient.signOut()}
            >
              {m.nav.signOut}
            </button>
          ) : (
            <Button
              variant="ghost"
              to={localePath(locale, "/signin")}
              className="hidden h-8 rounded-none px-2 font-mono text-[12.5px] lowercase md:inline-flex"
            >
              {m.nav.signin}
            </Button>
          )}
          <Button
            to={localePath(locale, signedIn ? "/dashboard" : "/signup")}
            className="h-8 whitespace-nowrap rounded-none px-3 font-mono text-[12px] lowercase tracking-wide sm:px-3.5"
          >
            {signedIn ? m.nav.goToConsole : m.nav.getKey}
          </Button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center text-mute hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? m.nav.close : "Menu"}</span>
            <span className="text-[13px] text-signal">{menuOpen ? "x" : ">_"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line px-4 py-3 font-mono text-[13px] lg:hidden">
          <p className="px-2 pb-2 text-[11px] text-faint">
            <span className="text-signal">$</span> ls {cwd}
          </p>
          <nav className="flex flex-col">
            {links.map((item) => (
              <Link key={item.to} to={item.to} className="px-2 py-2 text-mute hover:text-white">
                <span className="text-faint">./</span>
                {item.cmd}
                <span className="ml-2 text-[11px] text-faint">{item.label}</span>
              </Link>
            ))}
            {signedIn ? (
              <button
                type="button"
                className="px-2 py-2 text-left text-mute hover:text-white sm:hidden"
                onClick={() => void authClient.signOut()}
              >
                <span className="text-faint">./</span>
                logout
              </button>
            ) : (
              <Link to={localePath(locale, "/signin")} className="px-2 py-2 text-mute hover:text-white sm:hidden">
                <span className="text-faint">./</span>
                login
              </Link>
            )}
          </nav>
        </div>
      ) : null}

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
