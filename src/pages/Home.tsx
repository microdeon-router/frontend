import Button from "@/components/ui/Button";
import CodeBlock from "@/components/ui/CodeBlock";
import CatalogCarousel from "@/components/visual/CatalogCarousel";
import IntegrationCarousel from "@/components/visual/IntegrationCarousel";
import IntegrationHub from "@/components/visual/IntegrationHub";
import HeroTitle from "@/components/visual/HeroTitle";
import RouteSketch from "@/components/visual/RouteSketch";
import TryIt from "@/components/visual/TryIt";
import { localePath, useI18n } from "@/i18n";

export default function Home() {
  const { locale, m } = useI18n();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-infra pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1120px] flex-col items-center px-4 pb-10 pt-20 text-center sm:px-6 sm:pt-28">
          <HeroTitle key={locale} title1={m.hero.title1} title2={m.hero.title2} />
          <RouteSketch />
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button to={localePath(locale, "/signup")} className="px-5 py-2.5 text-[14.5px]">
              {m.hero.cta}
            </Button>
            <Button variant="ghost" to={localePath(locale, "/models")}>
              {m.hero.browse}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6">
        <dl className="grid grid-cols-2 overflow-hidden border border-line bg-panel font-mono lg:grid-cols-4">
          {m.stats.items.map((item) => (
            <div key={item.label} className="border-line px-5 py-6 text-center max-lg:odd:border-e max-lg:[&:nth-child(-n+2)]:border-b lg:not-last:border-e">
              <dd className="m-0 text-[1.45rem] tracking-tight text-white sm:text-[1.7rem]">{item.value}</dd>
              <dt className="mx-auto mt-2 max-w-[16rem] text-[12px] leading-snug text-mute">
                <span className="text-faint"># </span>
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto w-full max-w-[760px] px-4 py-8 sm:px-6">
        <CodeBlock />
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6">
        <IntegrationHub />
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-8 sm:px-6">
        <IntegrationCarousel />
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6">
        <CatalogCarousel />
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

      <TryIt />
    </>
  );
}
