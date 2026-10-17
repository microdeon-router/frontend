import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { agents, tools, type Integration } from "@/data/integrations";
import { localePath, useI18n } from "@/i18n";

const cards: Integration[] = [...agents, ...tools];

export default function IntegrationCarousel() {
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
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.carousel.kicker}</p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
            {m.carousel.title}
          </h2>
        </div>
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

      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex gap-5">
          {cards.map((card) => (
            <li key={card.slug} className="min-w-0 shrink-0 basis-[16.5rem] sm:basis-[18.5rem]">
              <Link
                to={localePath(locale, "/docs")}
                className="group relative flex h-[22rem] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-transform duration-300 hover:scale-[1.015]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="relative z-10">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-faint">
                    {card.kind === "agent" ? m.agents.kicker : m.tools.kicker}
                  </p>
                  <p className="mt-3 text-[1.65rem] font-medium tracking-tight text-white">{card.name}</p>
                </div>
                <div className="relative z-10 flex items-end justify-between">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-xl border border-line bg-ink">
                    <img src={card.src} alt="" className="size-10 object-contain" />
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full bg-white text-black">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
