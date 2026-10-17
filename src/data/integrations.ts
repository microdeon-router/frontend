export type Integration = {
  slug: string;
  name: string;
  kind: "agent" | "tool" | "auth" | "provider";
  src: string;
  href?: string;
};

export const agents: Integration[] = [
  { slug: "cursor", name: "Cursor", kind: "agent", src: "/brand/vendors/cursor/mark.png" },
  { slug: "claude-code", name: "Claude Code", kind: "agent", src: "/brand/vendors/claude-code/mark-mascot.jpg" },
  { slug: "goose", name: "Goose", kind: "agent", src: "/brand/vendors/goose/mark.png" },
  { slug: "hermes", name: "Hermes", kind: "agent", src: "/brand/vendors/hermes/mark-avatar.jpg" },
];

export const tools: Integration[] = [
  { slug: "ida", name: "IDA", kind: "tool", src: "/brand/vendors/ida/logo-with-text.jpg" },
  { slug: "burp-suite", name: "Burp Suite", kind: "tool", src: "/brand/vendors/burp-suite/mark.png" },
  { slug: "caido", name: "Caido", kind: "tool", src: "/brand/vendors/caido/mark.png" },
  { slug: "nmap", name: "Nmap", kind: "tool", src: "/brand/vendors/nmap/mark.png" },
  { slug: "wazuh", name: "Wazuh", kind: "tool", src: "/brand/vendors/wazuh/mark.png" },
  { slug: "elasticsearch", name: "Elasticsearch", kind: "tool", src: "/brand/vendors/elasticsearch/mark-on-dark.png" },
  { slug: "volatility", name: "Volatility", kind: "tool", src: "/brand/vendors/volatility/mark.jpg" },
];

export const authProviders: Integration[] = [
  { slug: "github", name: "GitHub", kind: "auth", src: "/brand/vendors/github/mark.png" },
  { slug: "google", name: "Google", kind: "auth", src: "/brand/vendors/google/mark.png" },
  { slug: "microsoft", name: "Microsoft", kind: "auth", src: "/brand/vendors/microsoft/mark.webp" },
];

export const modelProviders: Integration[] = [
  { slug: "huggingface", name: "Hugging Face", kind: "provider", src: "/brand/vendors/huggingface/mark.png" },
  { slug: "huihui", name: "huihui-ai", kind: "provider", src: "/brand/vendors/huihui/mark.webp" },
  { slug: "orca-router", name: "OrcaRouter", kind: "provider", src: "/brand/vendors/orca-router/mark.jpg" },
];
