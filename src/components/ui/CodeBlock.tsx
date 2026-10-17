import { useState } from "react";
import { agentSetups } from "@/data/agent-setups";
import { snippets, type Snippet } from "@/data/snippets";
import { useI18n } from "@/i18n";

function Line({ line }: { line: Snippet["lines"][number] }) {
  if (line.length === 0) return <span>{"\n"}</span>;
  return (
    <span>
      {line.map((token, index) => (
        <span key={index} className={token.k ? `tok-${token.k}` : undefined}>
          {token.t}
        </span>
      ))}
      {"\n"}
    </span>
  );
}

export default function CodeBlock({ ids }: { ids?: string[] }) {
  const { m } = useI18n();
  const list = ids ? snippets.filter((s) => ids.includes(s.id)) : snippets;
  const [current, setCurrent] = useState(list[0]?.id ?? "python");
  const [agentId, setAgentId] = useState(agentSetups[0]?.id ?? "cursor");
  const [copied, setCopied] = useState(false);
  const snippet = list.find((item) => item.id === current) ?? list[0];
  if (!snippet) return null;

  const isAgents = snippet.id === "agents";
  const setup = agentSetups.find((item) => item.id === agentId) ?? agentSetups[0];
  const text = isAgents ? (setup?.code ?? snippet.code) : snippet.code;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div
        className="flex items-center gap-1 overflow-x-auto border-b border-line px-3"
        role="tablist"
        aria-label="SDK"
      >
        {list.map((item) => {
          const selected = item.id === snippet.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setCurrent(item.id);
                setCopied(false);
              }}
              className={`shrink-0 border-b-2 px-2.5 py-2.5 text-[13px] ${
                selected ? "border-signal text-white" : "border-transparent text-mute hover:text-[#d0d0d0]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={copy}
          className="ml-auto shrink-0 px-2 py-2 text-[12px] text-mute hover:text-white"
        >
          {copied ? m.code.copied : m.code.copy}
        </button>
      </div>

      {isAgents ? (
        <>
          <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2">
            {agentSetups.map((item) => {
              const selected = item.id === agentId;
              const isAdd = item.id === "generic";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setAgentId(item.id);
                    setCopied(false);
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 text-[12px] ${
                    selected
                      ? "border-signal/60 bg-[#1a0708] text-white"
                      : "border-line text-mute hover:text-[#d0d0d0]"
                  }`}
                >
                  {item.src ? (
                    <img src={item.src} alt="" className="size-4 object-contain" />
                  ) : (
                    <span className="font-mono text-[11px]">{isAdd ? "+" : item.name.slice(0, 1)}</span>
                  )}
                  {isAdd ? m.code.yourAgent : item.name}
                </button>
              );
            })}
          </div>
          <p className="border-b border-line px-5 py-2 text-[11px] text-faint">
            <span className="font-mono">{setup?.file}</span>
            <span className="ml-3">{m.code.moreAgents}</span>
          </p>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-6 text-[#e7e7e7]">
            <code>{text}</code>
          </pre>
        </>
      ) : (
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-6 text-[#e7e7e7]">
          <code>
            {snippet.lines.map((line, index) => (
              <Line key={index} line={line} />
            ))}
          </code>
        </pre>
      )}
    </div>
  );
}
