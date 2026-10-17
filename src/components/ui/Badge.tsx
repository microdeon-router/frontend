import { cn } from "@/lib/cn";

export default function Badge({
  children,
  tone = "mute",
}: {
  children: React.ReactNode;
  tone?: "mute" | "signal" | "line";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[11px] tracking-wide",
        tone === "signal" && "border-signal/40 text-signal",
        tone === "mute" && "border-line text-mute",
        tone === "line" && "border-line text-[#c8c8c8]",
      )}
    >
      {children}
    </span>
  );
}
