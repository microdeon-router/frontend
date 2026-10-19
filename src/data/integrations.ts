export type Integration = {
  slug: string;
  name: string;
  kind: "agent" | "tool" | "auth" | "provider";
  src: string;
  href?: string;
};

export const agents: Integration[] = [
  { slug: "omp", name: "omp", kind: "agent", src: "/brand/vendors/omp/mark.svg", href: "https://omp.sh" },
  { slug: "cursor", name: "Cursor", kind: "agent", src: "/brand/vendors/cursor/mark.svg" },
  { slug: "claude-code", name: "Claude Code", kind: "agent", src: "/brand/vendors/claude-code/mark.svg" },
  { slug: "codex", name: "Codex", kind: "agent", src: "/brand/vendors/codex/mark.svg", href: "https://openai.com/codex" },
  { slug: "openclaw", name: "OpenClaw", kind: "agent", src: "/brand/vendors/openclaw/mark.svg", href: "https://github.com/openclaw/openclaw" },
  { slug: "goose", name: "Goose", kind: "agent", src: "/brand/vendors/goose/mark.svg" },
  { slug: "hermes", name: "Hermes", kind: "agent", src: "/brand/vendors/hermes/mark-avatar.jpg" },
  { slug: "continue", name: "Continue", kind: "agent", src: "/brand/vendors/continue/mark.svg", href: "https://continue.dev" },
  { slug: "cline", name: "Cline", kind: "agent", src: "/brand/vendors/cline/mark.svg", href: "https://cline.bot" },
];

export const tools: Integration[] = [
  { slug: "ida", name: "IDA", kind: "tool", src: "/brand/vendors/ida/logo-ui.webp" },
  { slug: "burp-suite", name: "Burp Suite", kind: "tool", src: "/brand/vendors/burp-suite/mark.svg" },
  { slug: "caido", name: "Caido", kind: "tool", src: "/brand/vendors/caido/mark.svg" },
  { slug: "nmap", name: "Nmap", kind: "tool", src: "/brand/vendors/nmap/mark-ui.webp" },
  { slug: "wireshark", name: "Wireshark", kind: "tool", src: "/brand/vendors/wireshark/mark.svg" },
  { slug: "wazuh", name: "Wazuh", kind: "tool", src: "/brand/vendors/wazuh/mark.svg" },
  { slug: "elasticsearch", name: "Elasticsearch", kind: "tool", src: "/brand/vendors/elasticsearch/mark.svg" },
  { slug: "volatility", name: "Volatility", kind: "tool", src: "/brand/vendors/volatility/mark.svg" },
];

export const authProviders: Integration[] = [
  { slug: "github", name: "GitHub", kind: "auth", src: "/brand/vendors/github/mark.svg" },
  { slug: "google", name: "Google", kind: "auth", src: "/brand/vendors/google/mark.svg" },
  { slug: "microsoft", name: "Microsoft", kind: "auth", src: "/brand/vendors/microsoft/mark.svg" },
];

export const modelProviders: Integration[] = [
  { slug: "huggingface", name: "Hugging Face", kind: "provider", src: "/brand/vendors/huggingface/mark.svg" },
  { slug: "huihui", name: "huihui-ai", kind: "provider", src: "/brand/vendors/huihui/mark.webp" },
  { slug: "orca-router", name: "OrcaRouter", kind: "provider", src: "/brand/vendors/orca-router/mark.jpg" },
];
