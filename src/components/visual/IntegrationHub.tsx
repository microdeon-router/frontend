import { useId } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { localePath, useI18n } from "@/i18n";

type HubItem = {
  id: string;
  src: string;
  x: number;
  y: number;
  path: string;
  delay: number;
};

const hubs: HubItem[] = [
  { id: "cursor", src: "/brand/vendors/cursor/mark.png", x: 110, y: 90, path: "M 270 205 V 105 Q 270 90 255 90 H 110", delay: 0.1 },
  { id: "claude", src: "/brand/vendors/claude-code/mark-mascot.jpg", x: 454, y: 70, path: "M 294 205 V 85 Q 294 70 309 70 H 454", delay: 0.2 },
  { id: "ida", src: "/brand/vendors/ida/logo-with-text.jpg", x: 80, y: 205, path: "M 250 205 H 80", delay: 0.3 },
  { id: "burp", src: "/brand/vendors/burp-suite/mark.png", x: 484, y: 205, path: "M 314 205 H 484", delay: 0.4 },
  { id: "caido", src: "/brand/vendors/caido/mark.png", x: 140, y: 340, path: "M 270 215 V 325 Q 270 340 255 340 H 140", delay: 0.55 },
  { id: "nmap", src: "/brand/vendors/nmap/mark.png", x: 430, y: 340, path: "M 294 215 V 325 Q 294 340 309 340 H 430", delay: 0.7 },
];

function AnimatedPath({ d, id }: { d: string; id: string }) {
  return (
    <>
      <path d={d} stroke="currentColor" strokeWidth="1" fill="none" className="text-line" />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#fb000f" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
}

function Integration() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
      >
        {hubs.map((item) => (
          <AnimatedPath key={item.id} d={item.path} id={`${containerId}-${item.id}`} />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-line bg-ink p-2 sm:size-24">
        <img src="/brand/microdeon/mark.png" alt="Microdeon" className="size-10 object-contain sm:size-14" />
        <motion.div
          className="absolute inset-0 rounded-2xl border border-signal/30"
          animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {hubs.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: item.delay }}
          style={{
            left: `${(item.x / 564) * 100}%`,
            top: `${(item.y / 410) * 100}%`,
          }}
          className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-xl border border-line bg-panel sm:size-14"
        >
          <img src={item.src} alt="" className="size-7 object-contain sm:size-8" />
        </motion.div>
      ))}
    </div>
  );
}

export default function IntegrationHub() {
  const { locale, m } = useI18n();

  return (
    <Card className="mx-auto grid w-full overflow-hidden p-0 lg:grid-cols-2">
      <div className="relative min-h-[22rem] overflow-hidden bg-ink sm:min-h-[26rem]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="relative z-10 h-full w-full p-4 sm:p-6">
          <Integration />
        </div>
      </div>
      <CardContent className="flex flex-col justify-center gap-6">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.integrate.kicker}</p>
          <h3 className="mt-3 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-white">
            {m.integrate.title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mute">{m.integrate.lead}</p>
        </div>
        <Link
          to={localePath(locale, "/docs")}
          className="inline-flex h-10 w-fit items-center rounded-full bg-signal px-5 text-[13.5px] font-medium text-white hover:bg-signal-hover"
        >
          {m.integrate.cta}
        </Link>
      </CardContent>
    </Card>
  );
}
