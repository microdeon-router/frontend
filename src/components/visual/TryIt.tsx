import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import Mark from "@/components/brand/Mark";
import { localePath, useI18n } from "@/i18n";
import { useAuthSession } from "@/lib/session";

export default function TryIt() {
  const { locale, m } = useI18n();
  const { signedIn } = useAuthSession();

  return (
    <section id="try" className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6">
      <Card className="grid overflow-hidden lg:grid-cols-[1.35fr_1fr]">
        <CardContent className="flex flex-col justify-center py-12 sm:py-16">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.tryIt.kicker}</p>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(1.7rem,3.2vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">
            {m.tryIt.title}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">{m.tryIt.lead}</p>
        </CardContent>
        <div className="relative flex min-h-[16rem] flex-col items-center justify-center gap-5 border-t border-line bg-ink px-8 py-12 lg:min-h-0 lg:border-s lg:border-t-0">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <Mark className="relative h-10 w-10 opacity-80" />
          <Button
            to={localePath(locale, signedIn ? "/dashboard" : "/signup")}
            className="relative px-7 py-2.5 text-[14.5px]"
          >
            {m.tryIt.cta}
          </Button>
          <p className="relative font-mono text-[11px] tracking-wide text-faint">api.microdeon.fr/v1</p>
        </div>
      </Card>
    </section>
  );
}
