import { agents } from "@/data/integrations";

export type AgentSetup = {
  id: string;
  name: string;
  src?: string;
  file: string;
  code: string;
};

const env = `# {name}: OpenAI-compatible
OPENAI_BASE_URL=https://api.microdeon.fr/v1
OPENAI_API_KEY=mdn_<id>_<secret>
OPENAI_MODEL=microdeon/cyberstrike-35b
`;

function fromAgent(id: string, file: string, extra = ""): AgentSetup {
  const agent = agents.find((item) => item.slug === id);
  const name = agent?.name ?? id;
  return {
    id,
    name,
    src: agent?.src,
    file,
    code: `${env.replace("{name}", name)}${extra}`,
  };
}

export const agentSetups: AgentSetup[] = [
  fromAgent(
    "omp",
    "omp.sh · env",
    `
# https://omp.sh: OpenAI-compatible provider
export OPENAI_BASE_URL=https://api.microdeon.fr/v1
export OPENAI_API_KEY=mdn_<id>_<secret>
`,
  ),
  fromAgent("cursor", "Cursor → Settings → Models"),
  fromAgent(
    "claude-code",
    "Claude Code · env",
    `
# Claude Code: OpenAI-compatible env
export OPENAI_BASE_URL=https://api.microdeon.fr/v1
export OPENAI_API_KEY=mdn_<id>_<secret>
`,
  ),
  fromAgent(
    "codex",
    "Codex · env",
    `
# Codex: OpenAI-compatible env
export OPENAI_BASE_URL=https://api.microdeon.fr/v1
export OPENAI_API_KEY=mdn_<id>_<secret>
`,
  ),
  fromAgent(
    "openclaw",
    "OpenClaw · env",
    `
# OpenClaw: OpenAI-compatible env
export OPENAI_BASE_URL=https://api.microdeon.fr/v1
export OPENAI_API_KEY=mdn_<id>_<secret>
`,
  ),
  fromAgent("goose", "Goose · .config/goose/config.yaml"),
  fromAgent("hermes", "Hermes · provider OpenAI"),
  {
    ...fromAgent("continue", ".continue/config.json"),
    code: `{
  "models": [{
    "title": "Microdeon CyberStrike",
    "provider": "openai",
    "model": "microdeon/cyberstrike-35b",
    "apiBase": "https://api.microdeon.fr/v1",
    "apiKey": "mdn_<id>_<secret>"
  }]
}
`,
  },
  fromAgent("cline", "VS Code · Cline · OpenAI Native"),
  {
    id: "aider",
    name: "Aider",
    file: "shell",
    code: `export OPENAI_API_BASE=https://api.microdeon.fr/v1
export OPENAI_API_KEY=mdn_<id>_<secret>
aider --model openai/microdeon/cyberstrike-35b
`,
  },
  {
    id: "generic",
    name: "+",
    file: "OpenAI-compatible",
    code: env.replace("{name}", "Any OpenAI-compatible agent"),
  },
];
