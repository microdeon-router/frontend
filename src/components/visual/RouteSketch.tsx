import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { agents, tools, type Integration } from "@/data/integrations";

const sources = agents;
const destinations = tools.slice(0, 4);

const ease = [0.16, 1, 0.3, 1] as const;

function useCycle(length: number, ms: number, start = 0) {
  const [index, setIndex] = useState(start);
  useEffect(() => {
    if (length < 2) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [length, ms]);
  return index;
}

function Rail() {
  return (
    <svg className="h-6 min-w-0 flex-1" viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path d="M0 12 H160" className="route-rail" />
      <circle r="2.2" fill="#fb000f">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M4 12 H156" />
      </circle>
    </svg>
  );
}

function Slot({ item }: { item: Integration }) {
  return (
    <div className="flex w-[5.5rem] flex-col items-center sm:w-[8rem]">
      <div className="relative h-[4.75rem] w-full overflow-hidden sm:h-[5.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease }}
            className="absolute inset-0 flex flex-col items-center"
          >
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-line bg-panel sm:size-14">
              <img src={item.src} alt="" className="size-8 object-contain sm:size-9" />
            </div>
            <p className="mt-2 w-full truncate text-center text-[12px] text-[#e4e4e4]">{item.name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function RouteSketch() {
  const left = sources[useCycle(sources.length, 3600)] ?? sources[0];
  const right = destinations[useCycle(destinations.length, 5100, 1)] ?? destinations[0];

  if (!left || !right) return null;

  return (
    <div className="mx-auto mt-14 w-full max-w-[42rem]" aria-hidden="true">
      <div className="flex items-start justify-between gap-1 sm:gap-3">
        <Slot item={left} />
        <div className="flex min-w-0 flex-1 items-center pt-[1.35rem] sm:pt-[1.55rem]">
          <Rail />
        </div>
        <div className="flex w-[5rem] flex-col items-center sm:w-[6.5rem]">
          <div className="relative flex size-12 items-center justify-center rounded-2xl border border-[#3a1014] bg-[#140608] sm:size-14">
            <img src="/brand/microdeon/mark.png" alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
            <span className="route-pulse absolute inset-0 rounded-2xl border border-signal/35" />
          </div>
          <p className="mt-2 text-[12px] text-white">Microdeon</p>
        </div>
        <div className="flex min-w-0 flex-1 items-center pt-[1.35rem] sm:pt-[1.55rem]">
          <Rail />
        </div>
        <Slot item={right} />
      </div>
    </div>
  );
}
