import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import { models, type Category } from "@/data/models";
import { localePath, useI18n } from "@/i18n";
import { modelPriceLabel } from "@/lib/price";

const cats: Array<Category | "all"> = ["all", "offsec", "detection", "reverse", "forensics", "nlp", "router"];

export default function ModelsPage() {
  const { locale, m, t } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return models.filter((model) => {
      if (cat !== "all" && model.category !== cat) return false;
      const copy = m.modelCopy[model.slug as keyof typeof m.modelCopy];
      if (query && !`${model.id} ${model.displayName} ${copy?.short ?? model.short}`.toLowerCase().includes(query))
        return false;
      return true;
    });
  }, [q, cat, m.modelCopy]);

  const chip = <T extends string>(
    value: T,
    current: T,
    set: (v: T) => void,
    label: string,
  ) => (
    <button
      key={value}
      type="button"
      onClick={() => set(value)}
      className={`rounded-full border px-3 py-1 text-[12px] ${
        current === value ? "border-signal text-white" : "border-line text-mute hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
      <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-faint">{m.catalog.kicker}</p>
      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-[-0.035em] text-white">
        {m.catalog.title}
      </h1>
      {m.catalog.lead ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mute">{m.catalog.lead}</p>
      ) : null}

      <label className="mt-8 block">
        <span className="sr-only">{m.catalog.search}</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={m.catalog.search}
          className="h-11 w-full rounded-lg border border-line bg-panel px-4 text-[14px] text-white outline-none placeholder:text-faint focus:border-[#444]"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="w-20 text-[11px] uppercase tracking-wide text-faint">{m.catalog.category}</span>
        {cats.map((item) => chip(item, cat, setCat, item === "all" ? m.catalog.all : m.cat[item]))}
      </div>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {filtered.length === 0 ? (
          <li className="py-16 text-center text-sm text-mute">{m.catalog.empty}</li>
        ) : (
          filtered.map((model) => (
            <li key={model.id}>
              <Link
                to={localePath(locale, `/models/${model.slug}`)}
                className="grid gap-3 py-5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-mono text-[12.5px] text-mute">{model.id}</p>
                  <p className="mt-1 text-[16px] text-white">{model.displayName}</p>
                  <p className="mt-1 text-[13px] text-mute">
                    {m.modelCopy[model.slug as keyof typeof m.modelCopy]?.short ?? model.short}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>{m.cat[model.category]}</Badge>
                </div>
                <div className="text-right font-mono text-[12px] text-faint">
                  {modelPriceLabel(
                    model,
                    m.catalog.from,
                    t((msg) => msg.catalog.perHour, { n: model.pricing.perHour }),
                  )}
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
