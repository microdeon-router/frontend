import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { models, type CatalogModel } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import { modelPriceLabel } from "@/lib/price";

function ModelCard({ model }: { model: CatalogModel }) {
  const { locale, m, t } = useI18n();
  const copy = m.modelCopy[model.slug as keyof typeof m.modelCopy];
  return (
    <Link
      to={localePath(locale, `/models/${model.slug}`)}
      className="group flex h-[16.5rem] flex-col rounded-2xl border border-line bg-panel p-5 transition-transform duration-300 hover:scale-[1.015]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[12.5px] text-mute">{model.id}</p>
          <h3 className="mt-1 text-[16px] font-medium tracking-tight text-white">{model.displayName}</h3>
        </div>
        <Badge>{m.cat[model.category]}</Badge>
      </div>
      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-mute">{copy?.short ?? model.short}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-faint">
        <span>
          {modelPriceLabel(
            model,
            m.catalog.from,
            t((msg) => msg.catalog.perHour, { n: model.pricing.perHour }),
          )}
        </span>
        {model.contextLength > 0 ? (
          <span>· {t((msg) => msg.catalog.context, { n: model.contextLength.toLocaleString() })}</span>
        ) : null}
      </div>
    </Link>
  );
}

export default function CatalogCarousel() {
  const { locale, m } = useI18n();
  const [emblaRef, api] = useEmblaCarousel({ align: "start", dragFree: true });
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);

  const sync = useCallback(() => {
    if (!api) return;
    setPrev(api.canScrollPrev());
    setNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api, sync]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.catalog.kicker}</p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
            {m.catalog.title}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={localePath(locale, "/models")}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-raised px-4 text-[13px] font-medium transition-colors hover:border-[#3a3a3a] hover:bg-white/5"
          >
            <span className="text-[#e8e8e8]">{m.hero.browse}</span>
            <ArrowUpRight className="size-3.5 text-[#e8e8e8]" />
          </Link>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!prev}
              className="flex size-10 items-center justify-center rounded-full border border-line text-[#d0d0d0] disabled:opacity-30"
              aria-label="prev"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!next}
              className="flex size-10 items-center justify-center rounded-full border border-line text-[#d0d0d0] disabled:opacity-30"
              aria-label="next"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex gap-4">
          {models.map((model) => (
            <li key={model.id} className="min-w-0 shrink-0 basis-[17rem] sm:basis-[19rem]">
              <ModelCard model={model} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
