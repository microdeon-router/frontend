import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CodeBlock from "@/components/ui/CodeBlock";
import IntegrationCarousel from "@/components/visual/IntegrationCarousel";
import IntegrationHub from "@/components/visual/IntegrationHub";
import RouteSketch from "@/components/visual/RouteSketch";
import { models } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import type { CatalogModel } from "@/data/models";

function ModelCard({ model }: { model: CatalogModel }) {
  const { locale, m, t } = useI18n();
  const copy = m.modelCopy[model.slug as keyof typeof m.modelCopy];
  return (
    <Link
      to={localePath(locale, `/models/${model.slug}`)}
      className="group flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors hover:border-[#333]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[12.5px] text-mute">{model.id}</p>
          <h3 className="mt-1 text-[16px] font-medium tracking-tight text-white">{model.displayName}</h3>
        </div>
        <Badge tone={model.status === "candidate" ? "signal" : "mute"}>{m.status[model.status]}</Badge>
      </div>
      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-mute">{copy?.short ?? model.short}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-faint">
        {model.pricing.inputPerMtok !== "—" ? (
          <span>{t((msg) => msg.catalog.perMtok, { n: model.pricing.inputPerMtok })} in</span>
        ) : (
          <span>{m.common.example}</span>
        )}
        {model.contextLength > 0 ? (
          <span>· {t((msg) => msg.catalog.context, { n: model.contextLength.toLocaleString() })}</span>
        ) : null}
      </div>
    </Link>
  );
}

export default function Home() {
  const { locale, m } = useI18n();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-infra pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center px-4 pb-10 pt-20 text-center sm:px-6 sm:pt-28">
          <h1 className="max-w-[18ch] text-[clamp(2.4rem,6vw,4.15rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
            {m.hero.title1}
            <br />
            {m.hero.title2}
          </h1>
          <RouteSketch />
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button to={localePath(locale, "/signup")} className="px-5 py-2.5 text-[14.5px]">
              {m.hero.cta}
            </Button>
            <Button variant="ghost" to={localePath(locale, "/models")}>
              {m.hero.browse}
            </Button>
          </div>
          <p className="mt-6 max-w-xl text-[12.5px] leading-relaxed text-faint">{m.hero.note}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {m.stats.items.map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-panel px-5 py-6 text-left">
              <dd className="text-[1.85rem] font-semibold tracking-tight text-white sm:text-[2.15rem]">{item.value}</dd>
              <dt className="mt-2 max-w-[16rem] text-[13px] leading-snug text-mute">{item.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto w-full max-w-[760px] px-4 py-8 sm:px-6">
        <h2 className="mb-4 text-center text-[15px] text-mute">{m.code.title}</h2>
        <CodeBlock />
        <p className="mt-4 text-center font-mono text-[12px] leading-relaxed text-faint">{m.code.footnote}</p>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6">
        <IntegrationHub />
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-8 sm:px-6">
        <IntegrationCarousel />
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.catalog.kicker}</p>
            <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
              {m.catalog.title}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">{m.catalog.lead}</p>
          </div>
          <Button variant="line" to={localePath(locale, "/models")} className="hidden sm:inline-flex">
            {m.hero.browse}
          </Button>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {models.slice(0, 3).map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.how.kicker}</p>
        <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">{m.how.title}</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {m.how.steps.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-5">
              <p className="font-mono text-[12px] text-signal">0{index + 1}</p>
              <h3 className="mt-3 text-[16px] font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.qualify.kicker}</p>
        <h2 className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.03em] text-white">
          {m.qualify.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mute">{m.qualify.body}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {m.qualify.points.map((point) => (
            <li key={point} className="flex gap-2 text-[14px] text-[#c8c8c8]">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
