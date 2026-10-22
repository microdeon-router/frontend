import { createContext, useContext, useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Wordmark } from "@/components/brand/Mark";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import Button from "@/components/ui/Button";
import { models, modelBySlug, type CatalogModel } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import { authClient } from "@/lib/auth-client";
import { modelPriceLabel } from "@/lib/price";
import { useAuthSession } from "@/lib/session";

const SESSION_KEY = "microdeon.sessions";

type GpuSession = {
  id: string;
  slug: string;
  status: "running" | "stopped";
  startedAt: string;
};

type ConsoleApi = {
  sessions: GpuSession[];
  reserve: (model: CatalogModel) => void;
  stop: (id: string) => void;
};

const ConsoleContext = createContext<ConsoleApi | null>(null);

function useConsole() {
  const value = useContext(ConsoleContext);
  if (!value) throw new Error("console");
  return value;
}

function loadSessions(): GpuSession[] {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GpuSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ConsoleLayout() {
  const { locale, m } = useI18n();
  const { data: session, user, isPending, signedIn } = useAuthSession();
  const [sessions, setSessions] = useState<GpuSession[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSessions(loadSessions());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
    } catch {
      /* ignore */
    }
  }, [ready, sessions]);

  if (isPending) {
    return <p className="px-4 py-16 text-center text-[14px] text-mute">{m.auth.pending}</p>;
  }
  if (!signedIn || !session) return <Navigate to={localePath(locale, "/signin")} replace />;

  const items = [
    { to: localePath(locale, "/dashboard"), label: "Overview", end: true },
    { to: localePath(locale, "/dashboard/catalog"), label: "Model Catalog", end: false },
    { to: localePath(locale, "/dashboard/sessions"), label: "My Sessions", end: false },
    { to: localePath(locale, "/dashboard/keys"), label: "API Keys", end: false },
    { to: localePath(locale, "/dashboard/billing"), label: "Usage & Billing", end: false },
    { to: localePath(locale, "/dashboard/settings"), label: "Settings", end: false },
  ];

  function reserve(model: CatalogModel) {
    setSessions((current) => {
      if (current.some((item) => item.slug === model.slug && item.status === "running")) return current;
      return [
        {
          id: `ses_${Math.random().toString(36).slice(2, 8)}`,
          slug: model.slug,
          status: "running",
          startedAt: new Date().toISOString(),
        },
        ...current,
      ];
    });
  }

  function stop(id: string) {
    setSessions((current) => current.map((item) => (item.id === id ? { ...item, status: "stopped" } : item)));
  }

  return (
    <ConsoleContext.Provider value={{ sessions, reserve, stop }}>
      <div className="flex min-h-dvh w-full">
        <aside className="sticky top-0 flex h-dvh w-56 shrink-0 flex-col border-r border-line bg-ink">
          <div className="flex flex-col gap-4 px-4 py-5">
            <Link to={localePath(locale)} aria-label="Microdeon">
              <Wordmark className="h-6 w-auto max-w-full" />
            </Link>
            <div className="self-end">
              <LanguageSwitch />
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 px-3" aria-label={m.dash.title}>
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-[13.5px] ${
                    isActive ? "bg-white/6 text-white" : "text-mute hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-line px-4 py-4">
            <p className="truncate font-mono text-[11px] text-faint">{user?.email}</p>
            <button
              type="button"
              className="mt-3 text-[13px] text-mute hover:text-white"
              onClick={() => void authClient.signOut()}
            >
              {m.nav.signOut}
            </button>
          </div>
        </aside>
        <div className="min-w-0 flex-1 px-6 py-8 sm:px-10">
          <Outlet />
        </div>
      </div>
    </ConsoleContext.Provider>
  );
}

function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-[1.6rem] font-semibold tracking-[-0.03em] text-white">{title}</h1>
      <p className="mt-2 text-[14px] text-mute">{lead}</p>
    </header>
  );
}

export function Overview() {
  const { m } = useI18n();
  const { sessions } = useConsole();
  const running = sessions.filter((item) => item.status === "running").length;
  return (
    <>
      <PageHead title={m.dash.overview} lead={m.dash.overviewLead} />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: m.dash.balance, v: "10,00 €" },
          { k: m.dash.sessions, v: String(running) },
          { k: m.dash.requests, v: "0" },
        ].map((card) => (
          <div key={card.k} className="rounded-xl border border-line bg-panel p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{card.k}</p>
            <p className="mt-3 font-mono text-[1.5rem] text-white">{card.v}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-[15px] font-medium text-white">{m.dash.activity}</h2>
      <ul className="mt-3 divide-y divide-line border-y border-line text-[13.5px]">
        <li className="flex items-center justify-between py-3">
          <span className="font-mono text-mute">VIREMENT-001</span>
          <span className="text-white">+10,00 €</span>
        </li>
      </ul>
      <p className="mt-3 text-[13px] text-faint">{m.dash.noUsage}</p>
    </>
  );
}

export function CatalogPanel() {
  const { m, t } = useI18n();
  const { sessions, reserve } = useConsole();
  return (
    <>
      <PageHead title={m.dash.catalogNav} lead={m.dash.catalogLead} />
      <ul className="divide-y divide-line border-y border-line">
        {models.map((model) => {
          const live = sessions.some((item) => item.slug === model.slug && item.status === "running");
          const price = modelPriceLabel(
            model,
            m.catalog.from,
            t((msg) => msg.catalog.perHour, { n: model.pricing.perHour }),
          );
          return (
            <li key={model.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="text-[15px] text-white">{model.displayName}</p>
                <p className="mt-1 font-mono text-[12px] text-faint">
                  {m.cat[model.category]} · {price}
                </p>
              </div>
              {live ? (
                <span className="text-[13px] text-mute">{m.dash.reserved}</span>
              ) : (
                <Button type="button" onClick={() => reserve(model)}>
                  {m.dash.reserve}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function SessionsPanel() {
  const { m } = useI18n();
  const { sessions, stop } = useConsole();
  return (
    <>
      <PageHead title={m.dash.sessions} lead={m.dash.sessionsLead} />
      {sessions.length === 0 ? (
        <p className="text-[14px] text-mute">{m.dash.noSessions}</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {sessions.map((item) => {
            const model = modelBySlug(item.slug);
            return (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-[15px] text-white">{model?.displayName ?? item.slug}</p>
                  <p className="mt-1 font-mono text-[12px] text-faint">
                    {item.id} · {item.status === "running" ? m.dash.running : m.dash.stopped}
                  </p>
                </div>
                {item.status === "running" ? (
                  <button type="button" className="text-[13px] text-mute hover:text-signal" onClick={() => stop(item.id)}>
                    {m.dash.stop}
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

const keys = [
  { id: "mdn_8f2a", hint: "mdn_8f2a_••••••••", scopes: "inference, usage:read, keys:write", created: "2026-10-17" },
];

export function KeysPanel() {
  const { m } = useI18n();
  const [toast, setToast] = useState<string | null>(null);
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] font-semibold tracking-[-0.03em] text-white">{m.dash.keys}</h1>
          <p className="mt-2 text-[14px] text-mute">{m.dash.keysLead}</p>
        </div>
        <Button variant="line" onClick={() => setToast(m.auth.note)}>
          {m.dash.newKey}
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-[13px]">
          <thead className="text-faint">
            <tr className="border-b border-line">
              <th className="px-4 py-3 font-normal">ID</th>
              <th className="px-4 py-3 font-normal">{m.dash.scope}</th>
              <th className="px-4 py-3 font-normal">{m.dash.created}</th>
              <th className="px-4 py-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id}>
                <td className="px-4 py-3 font-mono">{key.hint}</td>
                <td className="px-4 py-3 text-mute">{key.scopes}</td>
                <td className="px-4 py-3 text-mute">{key.created}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-mute hover:text-signal" onClick={() => setToast(m.auth.note)}>
                    {m.dash.revoke}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast ? (
        <p className="mt-6 text-[13px] text-mute">
          {toast}{" "}
          <button type="button" className="text-white" onClick={() => setToast(null)}>
            {m.common.close}
          </button>
        </p>
      ) : null}
    </>
  );
}

export function BillingPanel() {
  const { m } = useI18n();
  const [toast, setToast] = useState<string | null>(null);
  return (
    <>
      <PageHead title={m.dash.billingNav} lead={m.dash.billingLead} />
      <p className="font-mono text-[1.8rem] text-white">10,00 €</p>
      <p className="mt-1 text-[13px] text-mute">{m.dash.balance}</p>
      <ul className="mt-8 divide-y divide-line border-y border-line text-[13.5px]">
        <li className="flex items-center justify-between py-3">
          <span className="font-mono text-mute">VIREMENT-001</span>
          <span className="text-white">+10,00 €</span>
        </li>
      </ul>
      <p className="mt-3 text-[13px] text-faint">{m.dash.noUsage}</p>
      <Button className="mt-6" onClick={() => setToast(m.dash.topupSoon)}>
        {m.dash.stripe}
      </Button>
      {toast ? <p className="mt-4 text-[13px] text-mute">{toast}</p> : null}
    </>
  );
}

export function SettingsPanel() {
  const { m } = useI18n();
  const { user } = useAuthSession();
  const rows = [
    { k: m.dash.profile, v: user?.email ?? "" },
    { k: m.dash.org, v: m.dash.personal },
    { k: m.dash.members, v: user?.email ?? "" },
  ];
  return (
    <>
      <PageHead title={m.dash.settings} lead={m.dash.settingsLead} />
      <dl className="divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div key={row.k} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <dt className="text-[13px] text-faint">{row.k}</dt>
            <dd className="font-mono text-[13.5px] text-white">{row.v}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-8 text-[15px] font-medium text-white">{m.dash.security}</h2>
      <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-mute">{m.dash.securityBody}</p>
    </>
  );
}

export function ConsoleSection() {
  const { pathname } = useLocation();
  if (pathname.endsWith("/catalog")) return <CatalogPanel />;
  if (pathname.endsWith("/sessions")) return <SessionsPanel />;
  if (pathname.endsWith("/keys")) return <KeysPanel />;
  if (pathname.endsWith("/billing")) return <BillingPanel />;
  if (pathname.endsWith("/settings")) return <SettingsPanel />;
  return <Overview />;
}
