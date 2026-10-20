import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { models, type CatalogModel } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import { modelPriceLabel } from "@/lib/price";
import { useAuthSession } from "@/lib/session";

const API = "https://api.microdeon.fr/v1/chat/completions";
const KEY_STORAGE = "microdeon.consoleKey";

const keys = [
  { id: "mdn_8f2a", hint: "mdn_8f2a_••••••••", scopes: "inference, usage:read, keys:write", created: "2026-10-17" },
];

type Turn = { role: "user" | "assistant"; content: string; model?: string };

function replyText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const body = payload as {
    error?: { message?: string };
    choices?: { message?: { content?: string | null } }[];
  };
  if (body.error?.message) return body.error.message;
  const content = body.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

export default function Dashboard() {
  const { locale, m, t } = useI18n();
  const { data: session, user, isPending, signedIn } = useAuthSession();
  const [modelId, setModelId] = useState(models[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      setApiKey(localStorage.getItem(KEY_STORAGE) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  if (isPending) {
    return <p className="px-4 py-16 text-center text-[14px] text-mute">{m.auth.pending}</p>;
  }
  if (!signedIn || !session) return <Navigate to={localePath(locale, "/signin")} replace />;

  const selected = models.find((item) => item.id === modelId) ?? models[0];

  function rememberKey(value: string) {
    setApiKey(value);
    try {
      if (value.trim()) localStorage.setItem(KEY_STORAGE, value.trim());
      else localStorage.removeItem(KEY_STORAGE);
    } catch {
      /* ignore */
    }
  }

  async function send() {
    const content = draft.trim();
    const key = apiKey.trim();
    if (!content || busy || !selected) return;
    if (!key) {
      setNotice(m.dash.needKey);
      return;
    }
    const history = [...turns, { role: "user" as const, content }];
    setTurns(history);
    setDraft("");
    setNotice(null);
    setBusy(true);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selected.id,
          messages: history.map(({ role, content: text }) => ({ role, content: text })),
        }),
      });
      const payload = await response.json().catch(() => null);
      const text = replyText(payload);
      if (!response.ok || !text) {
        setNotice(text || m.dash.failed);
        return;
      }
      setTurns([...history, { role: "assistant", content: text, model: selected.displayName }]);
    } catch {
      setNotice(m.dash.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[840px] flex-col px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">{m.dash.title}</h1>
          <p className="mt-2 text-[14px] text-mute">{m.dash.lead}</p>
          <p className="mt-1 font-mono text-[12px] text-faint">{user?.email}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[1.15rem] text-white">10,00 €</p>
          <button type="button" className="mt-1 text-[13px] text-mute hover:text-white" onClick={() => setToast(m.dash.stripe)}>
            {m.dash.stripe}
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {models.map((model) => (
          <ModelChip
            key={model.id}
            model={model}
            active={model.id === selected?.id}
            label={modelPriceLabel(
              model,
              m.catalog.from,
              t((msg) => msg.catalog.perHour, { n: model.pricing.perHour }),
            )}
            category={m.cat[model.category]}
            onPick={() => setModelId(model.id)}
          />
        ))}
      </div>

      <section className="mt-4 flex min-h-[32rem] flex-col rounded-2xl border border-line bg-panel">
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
          {turns.length === 0 ? (
            <p className="pt-16 text-center text-[14px] text-mute">{m.dash.empty}</p>
          ) : (
            turns.map((turn, index) => (
              <article key={`${turn.role}-${index}`} className={turn.role === "user" ? "ms-auto max-w-[40rem]" : "max-w-[40rem]"}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {turn.role === "user" ? user?.email : turn.model}
                </p>
                <p className="mt-1.5 whitespace-pre-wrap text-[14.5px] leading-relaxed text-white">{turn.content}</p>
              </article>
            ))
          )}
          {busy ? <p className="text-[13px] text-mute">{m.dash.working}</p> : null}
          {notice ? <p className="text-[13px] text-signal">{notice}</p> : null}
        </div>

        <form
          className="border-t border-line p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
        >
          <label className="mb-2 flex items-center gap-3 px-1">
            <span className="shrink-0 text-[12px] text-faint">{m.dash.keyPh}</span>
            <input
              type="password"
              autoComplete="off"
              value={apiKey}
              onChange={(event) => rememberKey(event.target.value)}
              placeholder="mdn_"
              className="w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-faint"
            />
            {turns.length > 0 ? (
              <button
                type="button"
                className="shrink-0 text-[12px] text-mute hover:text-white"
                onClick={() => {
                  setTurns([]);
                  setNotice(null);
                }}
              >
                {m.dash.clear}
              </button>
            ) : null}
          </label>
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              rows={2}
              placeholder={m.dash.prompt}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
              className="min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-[14.5px] text-white outline-none placeholder:text-faint"
            />
            <Button type="submit" className="mb-1 shrink-0" disabled={busy || !draft.trim()}>
              {m.dash.send}
            </Button>
          </div>
          <p className="px-2 pb-1 font-mono text-[11px] text-faint">{selected?.id}</p>
        </form>
      </section>

      <details className="mt-8">
        <summary className="cursor-pointer text-[13px] text-mute">{m.dash.keys}</summary>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line">
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
      </details>

      {toast ? (
        <p className="mt-6 rounded-lg border border-line bg-raised px-4 py-3 text-[13px] text-mute">
          {toast}{" "}
          <button type="button" className="text-white" onClick={() => setToast(null)}>
            {m.common.close}
          </button>
        </p>
      ) : null}
    </div>
  );
}

function ModelChip({
  model,
  active,
  label,
  category,
  onPick,
}: {
  model: CatalogModel;
  active: boolean;
  label: string;
  category: string;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`shrink-0 rounded-xl border px-3 py-2 text-left transition-colors ${
        active ? "border-white/50 bg-white/5" : "border-line bg-panel hover:border-[#3a3a3a]"
      }`}
    >
      <span className="block text-[13px] font-medium text-white">{model.displayName}</span>
      <span className="mt-0.5 block font-mono text-[11px] text-faint">
        {category} · {label}
      </span>
    </button>
  );
}
