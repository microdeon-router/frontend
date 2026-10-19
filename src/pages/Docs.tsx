import CodeBlock from "@/components/ui/CodeBlock";
import { useI18n } from "@/i18n";

const endpoints = [
  ["GET", "/healthz", "-"],
  ["GET", "/v1/models", "clé"],
  ["GET", "/v1/models/{id}", "clé"],
  ["POST", "/v1/chat/completions", "inference"],
  ["GET", "/v1/usage", "usage:read"],
  ["GET", "/v1/usage/requests", "usage:read"],
  ["GET", "/v1/ledger", "usage:read"],
  ["GET", "/v1/api-keys", "keys:write"],
  ["POST", "/v1/api-keys", "keys:write"],
  ["DELETE", "/v1/api-keys/{id}", "keys:write"],
  ["POST", "/v1/billing/checkout", "keys:write"],
];

const errors = [
  ["400", "invalid_request / streaming_unsupported / tools_unsupported"],
  ["401", "missing_api_key / invalid_api_key / api_key_revoked"],
  ["402", "insufficient_credits / spend_limit_exceeded"],
  ["403", "missing_scope / model_not_allowed / data_policy_unmet"],
  ["404", "model_not_found"],
  ["409", "idempotency_key_reused"],
  ["429", "rate_limit_exceeded / concurrency_limit_exceeded"],
  ["502–504", "upstream_error / unavailable / timeout"],
];

export default function Docs() {
  const { m } = useI18n();
  const toc = [
    { href: "#base", label: m.docs.base },
    { href: "#auth", label: m.docs.auth },
    { href: "#chat", label: m.docs.chat },
    { href: "#agents", label: m.docs.agents },
    { href: "#errors", label: m.docs.errors },
    { href: "#billing", label: m.docs.billing },
  ];

  return (
    <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[200px_1fr]">
      <aside className="hidden lg:block">
        <p className="text-[11px] uppercase tracking-[0.16em] text-faint">{m.docs.toc}</p>
        <nav className="mt-4 sticky top-24 space-y-2">
          {toc.map((item) => (
            <a key={item.href} href={item.href} className="block text-[13px] text-mute hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="max-w-[720px]">
        <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-[-0.035em] text-white">{m.docs.title}</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-mute">{m.docs.lead}</p>

        <section id="base" className="mt-14">
          <h2 className="text-[18px] font-medium text-white">{m.docs.base}</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-panel px-4 py-3 font-mono text-[13px]">
            https://api.microdeon.fr/v1
          </pre>
        </section>

        <section id="auth" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.auth}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{m.docs.authBody}</p>
        </section>

        <section id="chat" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.chat}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{m.docs.chatBody}</p>
          <p className="mt-3 text-[13.5px] text-faint">{m.docs.streaming}</p>
          <div className="mt-6">
            <CodeBlock ids={["python", "typescript", "curl"]} />
          </div>
        </section>

        <section id="agents" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.agents}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{m.docs.agentsBody}</p>
          <div className="mt-6">
            <CodeBlock ids={["agents"]} />
          </div>
        </section>

        <section id="endpoints" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.endpoints}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-[13px]">
              <tbody>
                {endpoints.map(([method, path, scope]) => (
                  <tr key={path} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 font-mono text-signal">{method}</td>
                    <td className="px-3 py-2 font-mono">{path}</td>
                    <td className="px-3 py-2 text-mute">{scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="errors" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.errors}</h2>
          <ul className="mt-4 space-y-2 font-mono text-[13px] text-mute">
            {errors.map(([code, body]) => (
              <li key={code}>
                <span className="text-white">{code}</span> · {body}
              </li>
            ))}
          </ul>
        </section>

        <section id="headers" className="mt-12">
          <h2 className="text-[18px] font-medium text-white">{m.docs.headers}</h2>
          <p className="mt-3 font-mono text-[13px] leading-relaxed text-mute">
            x-request-id · x-microdeon-model-version · x-microdeon-billed-micro · Idempotency-Key ·
            X-Microdeon-Require-ZDR
          </p>
        </section>

        <section id="billing" className="mt-12 pb-8">
          <h2 className="text-[18px] font-medium text-white">{m.docs.billing}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{m.docs.billingBody}</p>
        </section>
      </div>
    </div>
  );
}
