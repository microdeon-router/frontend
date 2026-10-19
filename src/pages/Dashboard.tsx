import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { localePath, useI18n } from "@/i18n";
import { useAuthSession } from "@/lib/session";

const keys = [
  { id: "mdn_8f2a", hint: "mdn_8f2a_••••••••", scopes: "inference, usage:read, keys:write", created: "2026-10-17" },
];

const ledger = [
  { type: "topup", amount: "+10,00 €", ref: "VIREMENT-001", at: "2026-10-17" },
];

export default function Dashboard() {
  const { locale, m } = useI18n();
  const { data: session, user, isPending, signedIn } = useAuthSession();
  const [toast, setToast] = useState<string | null>(null);

  if (isPending) {
    return <p className="px-4 py-16 text-center text-[14px] text-mute">{m.auth.pending}</p>;
  }
  if (!signedIn || !session) return <Navigate to={localePath(locale, "/signin")} replace />;

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold tracking-[-0.035em] text-white">{m.dash.title}</h1>
          <p className="mt-3 max-w-xl text-[15px] text-mute">{m.dash.lead}</p>
          <p className="mt-2 font-mono text-[13px] text-faint">{user?.email}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { k: m.dash.balance, v: "10,00 €" },
          { k: m.dash.requests, v: "0" },
          { k: m.dash.tokens, v: "0" },
        ].map((card) => (
          <div key={card.k} className="rounded-xl border border-line bg-panel p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{card.k}</p>
            <p className="mt-3 font-mono text-[1.6rem] text-white">{card.v}</p>
            <p className="mt-1 text-[12px] text-mute">{m.dash.month}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-white">{m.dash.keys}</h2>
          <Button
            variant="line"
            onClick={() => setToast(m.auth.note)}
          >
            {m.dash.newKey}
          </Button>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
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
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[16px] font-medium text-white">{m.dash.ledger}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {ledger.map((row) => (
              <li key={row.ref} className="flex items-center justify-between py-3 text-[13.5px]">
                <span className="font-mono text-mute">{row.ref}</span>
                <span className="text-white">{row.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-faint">{m.dash.noUsage}</p>
        </div>
        <div className="rounded-xl border border-line bg-panel p-6">
          <h2 className="text-[16px] font-medium text-white">{m.dash.topup}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-mute">{m.dash.topupSoon}</p>
          <Button
            className="mt-5"
            onClick={() => setToast(m.dash.stripe)}
          >
            {m.dash.stripe}
          </Button>
        </div>
      </section>

      {toast ? (
        <p className="mt-8 rounded-lg border border-line bg-raised px-4 py-3 text-[13px] text-mute">
          {toast}{" "}
          <button type="button" className="text-white" onClick={() => setToast(null)}>
            {m.common.close}
          </button>
        </p>
      ) : null}
    </div>
  );
}
