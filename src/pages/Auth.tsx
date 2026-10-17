import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GitHubIcon, GoogleIcon, MicrosoftIcon } from "@/components/brand/AuthProviderIcon";
import { Wordmark } from "@/components/brand/Mark";
import Button from "@/components/ui/Button";
import { localePath, useI18n } from "@/i18n";
import { authClient } from "@/lib/auth-client";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-mute" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3.2 3.8-5 7-5s5.6 1.8 7 5" strokeLinecap="round" />
    </svg>
  );
}

const providers = [
  { slug: "github", name: "GitHub", Icon: GitHubIcon },
  { slug: "google", name: "Google", Icon: GoogleIcon },
  { slug: "microsoft", name: "Microsoft", Icon: MicrosoftIcon },
] as const;

type SocialProvider = (typeof providers)[number]["slug"];

export default function Auth({ mode }: { mode: "signin" | "signup" }) {
  const { locale, m, t } = useI18n();
  const navigate = useNavigate();
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const signup = mode === "signup";
  const next = localePath(locale, "/dashboard");

  const fail = (message?: string) => {
    setError(message || m.auth.failed);
    setPending(false);
  };

  const social = async (provider: SocialProvider) => {
    setError(null);
    setPending(true);
    const { error: authError } = await authClient.signIn.social({
      provider,
      callbackURL: next,
    });
    if (authError) fail(authError.message);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");
    const { error: authError } = signup
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password });
    if (authError) {
      fail(authError.message);
      return;
    }
    const session = await authClient.getSession();
    if (!session.data) {
      fail();
      return;
    }
    navigate(next);
  };

  if (!sessionPending && session) return <Navigate to={next} replace />;

  return (
    <div className="mx-auto flex max-w-[420px] flex-col px-4 py-16 sm:px-6">
      <Wordmark className="mx-auto h-7 w-auto" />
      <h1 className="mt-8 text-center text-[1.7rem] font-semibold tracking-[-0.03em] text-white">
        {signup ? m.auth.signupTitle : m.auth.signinTitle}
      </h1>
      <div className="mt-8 space-y-2">
        {providers.map((item) => (
          <button
            key={item.slug}
            type="button"
            disabled={pending}
            onClick={() => void social(item.slug)}
            className="flex h-11 w-full items-center gap-3 rounded-lg border border-line bg-panel px-3 text-left text-[14px] text-[#e0e0e0] hover:border-[#333] disabled:opacity-60"
          >
            <item.Icon className="h-5 w-5 shrink-0 text-white" />
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
              required
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
            minLength={8}
            autoComplete={signup ? "new-password" : "current-password"}
            className="h-11 w-full rounded-lg border border-line bg-panel px-3 text-[14px] text-white outline-none focus:border-[#444]"
          />
        </label>
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-lg disabled:opacity-60">
          {pending ? m.auth.pending : signup ? m.auth.submitUp : m.auth.submitIn}
        </Button>
      </form>

      {error ? <p className="mt-4 text-center text-[13px] text-signal">{error}</p> : null}

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
