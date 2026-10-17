import { Link, Navigate, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CodeBlock from "@/components/ui/CodeBlock";
import { modelBySlug } from "@/data/models";
import { localePath, useI18n } from "@/i18n";

export default function ModelDetail() {
  const { slug } = useParams();
  const { locale, m, t } = useI18n();
  const model = slug ? modelBySlug(slug) : undefined;
  if (!model) return <Navigate to={localePath(locale, "/models")} replace />;

  const specs = [
    { k: m.model.runtime, v: model.runtime },
    { k: m.model.params, v: model.params },
    { k: m.catalog.context, v: model.contextLength ? String(model.contextLength) : "—" },
    { k: m.model.output, v: model.maxOutput ? String(model.maxOutput) : "—" },
    { k: m.model.upstream, v: model.upstream },
    { k: m.catalog.status, v: m.status[model.status] },
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
      <Link to={localePath(locale, "/models")} className="text-[13px] text-mute hover:text-white">
        ← {m.model.back}
      </Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[13px] text-mute">{model.id}</p>
          <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.7rem)] font-semibold tracking-[-0.035em] text-white">
            {model.displayName}
          </h1>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge tone="signal">{m.status[model.status]}</Badge>
            {model.capabilities.map((c) => (
              <Badge key={c}>{m.cap[c]}</Badge>
            ))}
            <Badge>{m.cat[model.category]}</Badge>
          </div>
        </div>
        <Button to={localePath(locale, "/docs")}>{m.model.use}</Button>
      </div>
      <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-mute">
        {m.modelCopy[model.slug as keyof typeof m.modelCopy]?.description ?? model.description}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-[15px] font-medium text-white">{m.model.specs}</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {specs.map((row) => (
              <div key={row.k} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-[13.5px] sm:grid-cols-[10rem_1fr]">
                <dt className="text-mute">{row.k}</dt>
                <dd className="font-mono text-[#e0e0e0]">{row.v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-[15px] font-medium text-white">{m.model.limits}</h2>
          <ul className="mt-3 space-y-2">
            {model.limitations.map((item) => (
              <li key={item} className="text-[14px] leading-relaxed text-mute">
                — {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{m.model.pricing}</p>
            <p className="mt-3 font-mono text-[13px] text-white">
              in {model.pricing.inputPerMtok} € · out {model.pricing.outputPerMtok} € / MTok
            </p>
            <p className="mt-2 text-[12px] text-mute">
              {t((msg) => msg.catalog.examplePrice, { version: model.pricing.version })}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{m.model.policy}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mute">{model.dataPolicy.backend}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{model.dataPolicy.retention}</p>
            <p className="mt-3 text-[12.5px] text-signal">{model.dataPolicy.zdr ? m.model.zdr : m.model.zdrNo}</p>
            <p className="mt-2 text-[12px] text-faint">{m.model.notEvaluated}</p>
          </div>
          {model.vendorLogo ? (
            <div className="flex items-center gap-3 rounded-xl border border-line bg-panel px-5 py-4">
              <img src={model.vendorLogo} alt="" className="h-8 w-8 object-contain" />
              <span className="text-[13px] text-mute">{model.provider}</span>
            </div>
          ) : null}
        </aside>
      </div>

      <div className="mt-14 max-w-[760px]">
        <CodeBlock ids={["python", "curl", "agents"]} />
      </div>
    </div>
  );
}
