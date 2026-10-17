import { useState } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/Mark";
import VendorMark from "@/components/brand/VendorMark";
import Button from "@/components/ui/Button";
import { authProviders } from "@/data/integrations";
import { localePath, useI18n } from "@/i18n";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-mute" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3.2 3.8-5 7-5s5.6 1.8 7 5" strokeLinecap="round" />
    </svg>
  );
}

export default function Auth({ mode }: { mode: "signin" | "signup" }) {
  const { locale, m, t } = useI18n();
  const [note, setNote] = useState(false);
  const signup = mode === "signup";

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setNote(true);
  };

  return (
    <div className="mx-auto flex max-w-[420px] flex-col px-4 py-16 sm:px-6">
      <Wordmark className="mx-auto h-7 w-auto" />
      <h1 className="mt-8 text-center text-[1.7rem] font-semibold tracking-[-0.03em] text-white">
        {signup ? m.auth.signupTitle : m.auth.signinTitle}
      </h1>
      <p className="mt-3 text-center text-[14px] leading-relaxed text-mute">
        {signup ? m.auth.signupLead : m.auth.signinLead}
      </p>

      <div className="mt-8 space-y-2">
        {authProviders.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setNote(true)}
            className="flex h-11 w-full items-center gap-3 rounded-lg border border-line bg-panel px-3 text-left text-[14px] text-[#e0e0e0] hover:border-[#333]"
          >
            <VendorMark src={item.src} name={item.name} className="h-6 w-6" />
            {t((msg) => msg.auth.continue, { name: item.name })}
          </button>
        ))}
      </div>

      <p className="my-6 text-center text-[12px] uppercase tracking-[0.14em] text-faint">{m.auth.orEmail}</p>

      <form onSubmit={submit} className="space-y-3">
        {signup ? (
          <label className="block">
            <span className="mb-1.5 block text-[12px] text-mute">{m.auth.name}</span>
            <input
              name="name"
              autoComplete="name"
              className="h-11 w-full rounded-lg border border-line bg-panel px-3 text-[14px] text-white outline-none focus:border-[#444]"
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-mute">{m.auth.email}</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <PersonIcon />
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="h-11 w-full rounded-lg border border-line bg-panel py-2 pl-10 pr-3 text-[14px] text-white outline-none focus:border-[#444]"
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-mute">{m.auth.password}</span>
          <input
            type="password"
            name="password"
            required
            autoComplete={signup ? "new-password" : "current-password"}
            className="h-11 w-full rounded-lg border border-line bg-panel px-3 text-[14px] text-white outline-none focus:border-[#444]"
          />
        </label>
        <Button type="submit" className="h-11 w-full rounded-lg">
          {signup ? m.auth.submitUp : m.auth.submitIn}
        </Button>
      </form>

      {note ? <p className="mt-4 text-center text-[13px] text-mute">{m.auth.note}</p> : null}

      <p className="mt-8 text-center text-[13.5px] text-mute">
        {signup ? m.auth.hasAccount : m.auth.noAccount}{" "}
        <Link
          to={localePath(locale, signup ? "/signin" : "/signup")}
          className="text-white hover:text-signal"
        >
          {signup ? m.nav.signin : m.nav.signup}
        </Link>
      </p>
    </div>
  );
}
