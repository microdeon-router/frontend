import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const REFUSAL = "This request may violate our usage policies.";
const ease = [0.16, 1, 0.3, 1] as const;
const strikeEase = [0.22, 1, 0.36, 1] as const;

type Phase = "type-refusal" | "strike-refusal" | "type-title";

function useTyped(text: string, active: boolean, ms: number, instant: boolean) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }
    if (!active) return;
    if (count >= text.length) return;
    const id = window.setTimeout(() => setCount((n) => n + 1), ms);
    return () => window.clearTimeout(id);
  }, [active, count, instant, ms, text.length]);

  return { value: text.slice(0, count), done: count >= text.length };
}

function Caret() {
  return (
    <span
      className="hero-caret ml-[0.05em] inline-block h-[0.82em] w-[0.085em] translate-y-[0.06em] bg-signal align-baseline"
      aria-hidden="true"
    />
  );
}

export default function HeroTitle({
  title1,
  title2,
  strikeAfter,
}: {
  title1: string;
  title2: string;
  strikeAfter: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>(reduced ? "type-title" : "type-refusal");
  const refusal = useTyped(REFUSAL, phase === "type-refusal", 26, reduced);
  const lead = useTyped(strikeAfter ? title1 : title2, phase === "type-title", strikeAfter ? 22 : 26, reduced);
  const tail = useTyped(strikeAfter ? title2 : title1, phase === "type-title" && lead.done, strikeAfter ? 26 : 22, reduced);

  useEffect(() => {
    if (reduced) return;
    if (phase === "type-refusal" && refusal.done) {
      const id = window.setTimeout(() => setPhase("strike-refusal"), 220);
      return () => window.clearTimeout(id);
    }
    if (phase === "strike-refusal") {
      const id = window.setTimeout(() => setPhase("type-title"), 620);
      return () => window.clearTimeout(id);
    }
  }, [phase, reduced, refusal.done]);

  const showTitle = phase === "type-title";
  const struck = strikeAfter ? tail : lead;
  const plain = strikeAfter ? lead : tail;
  const showStrike = reduced || struck.done;

  return (
    <h1 className="relative flex min-h-[6.8rem] w-full max-w-[22rem] items-center justify-center text-center sm:min-h-[8.2rem] sm:max-w-[36rem]">
      <span className="sr-only">
        {strikeAfter ? (
          <>
            {title1} <s>{title2}</s>
          </>
        ) : (
          <>
            <s>{title2}</s> {title1}
          </>
        )}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {!showTitle ? (
          <motion.span
            key="refusal"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
            transition={{ duration: 0.32, ease }}
            className="relative inline-block max-w-[16ch] text-[clamp(1.55rem,4.4vw,2.55rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-[#d8d8d8] sm:max-w-[20ch]"
          >
            {refusal.value}
            {phase === "type-refusal" ? <Caret /> : null}
            {phase === "strike-refusal" ? (
              <motion.span
                className="pointer-events-none absolute inset-0 text-transparent line-through decoration-signal decoration-[0.09em]"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.48, ease }}
              >
                {REFUSAL}
              </motion.span>
            ) : null}
          </motion.span>
        ) : (
          <motion.span
            key="title"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease }}
            className="max-w-[18ch] text-[clamp(2.2rem,5.6vw,3.7rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:max-w-[22ch]"
          >
            {strikeAfter ? (
              <>
                {plain.value}
                {plain.done ? " " : null}
              </>
            ) : null}
            <span className="relative inline-block whitespace-nowrap text-signal">
              {struck.value}
              {showStrike ? (
                <motion.span
                  className="pointer-events-none absolute inset-x-0 top-[0.52em] h-[0.09em] origin-start bg-signal"
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: strikeEase }}
                />
              ) : null}
            </span>
            {strikeAfter ? null : struck.done ? " " : null}
            {strikeAfter ? null : plain.value}
            {!(strikeAfter ? tail.done : plain.done) ? <Caret /> : null}
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}
