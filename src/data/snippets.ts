export type TokenKind = "k" | "s" | "p" | "fn";
export type Token = { t: string; k?: TokenKind };

const k = (t: string): Token => ({ t, k: "k" });
const s = (t: string): Token => ({ t, k: "s" });
const p = (t: string): Token => ({ t, k: "p" });
const fn = (t: string): Token => ({ t, k: "fn" });
const n = (t: string): Token => ({ t });

export type Snippet = {
  id: string;
  label: string;
  code: string;
  lines: Token[][];
};

export const snippets: Snippet[] = [
  {
    id: "python",
    label: "Python",
    code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.microdeon.fr/v1",
    api_key=os.environ["MICRODEON_API_KEY"],
)

resp = client.chat.completions.create(
    model="microdeon/cyberstrike-35b",
    messages=[{"role": "user", "content": "Analyse ce journal."}],
)
`,
    lines: [
      [k("import"), n(" os")],
      [k("from"), n(" openai "), k("import"), n(" OpenAI")],
      [],
      [n("client "), p("="), n(" OpenAI(")],
      [n("    base_url"), p("="), s('"https://api.microdeon.fr/v1"'), p(",")],
      [n("    api_key"), p("="), n("os.environ["), s('"MICRODEON_API_KEY"'), p("],")],
      [p(")")],
      [],
      [n("resp "), p("="), n(" client.chat.completions."), fn("create"), p("(")],
      [n("    model"), p("="), s('"microdeon/cyberstrike-35b"'), p(",")],
      [n("    messages"), p("="), n("[{"), s('"role"'), n(": "), s('"user"'), p(",")],
      [n("                "), s('"content"'), n(": "), s('"Analyse ce journal."'), n("}],")],
      [p(")")],
    ],
  },
  {
    id: "typescript",
    label: "TypeScript",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.microdeon.fr/v1",
  apiKey: process.env.MICRODEON_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "microdeon/cyberstrike-35b",
  messages: [{ role: "user", content: "Analyse ce journal." }],
});
`,
    lines: [
      [k("import"), n(" OpenAI "), k("from"), n(" "), s('"openai"'), p(";")],
      [],
      [k("const"), n(" client "), p("="), n(" "), k("new"), n(" OpenAI({")],
      [n("  baseURL: "), s('"https://api.microdeon.fr/v1"'), p(",")],
      [n("  apiKey: process.env.MICRODEON_API_KEY,")],
      [p("});")],
      [],
      [k("const"), n(" resp "), p("="), n(" "), k("await"), n(" client.chat.completions.create({")],
      [n("  model: "), s('"microdeon/cyberstrike-35b"'), p(",")],
      [n("  messages: [{ role: "), s('"user"'), n(", content: "), s('"Analyse ce journal."'), n(" }],")],
      [p("});")],
    ],
  },
  {
    id: "curl",
    label: "cURL",
    code: `curl https://api.microdeon.fr/v1/chat/completions \\
  -H "Authorization: Bearer $MICRODEON_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"microdeon/cyberstrike-35b","messages":[{"role":"user","content":"Analyse ce journal."}]}'
`,
    lines: [
      [n("curl "), s("https://api.microdeon.fr/v1/chat/completions"), n(" \\")],
      [n("  -H "), s('"Authorization: Bearer $MICRODEON_API_KEY"'), n(" \\")],
      [n("  -H "), s('"Content-Type: application/json"'), n(" \\")],
      [n("  -d "), s(`'{"model":"microdeon/cyberstrike-35b",…}'`)],
    ],
  },
  {
    id: "agents",
    label: "Agents",
    code: `# Cursor / Claude Code / Goose / Hermes — endpoint OpenAI-compatible
OPENAI_BASE_URL=https://api.microdeon.fr/v1
OPENAI_API_KEY=mdn_<id>_<secret>
OPENAI_MODEL=microdeon/cyberstrike-35b
`,
    lines: [
      [p("# Cursor / Claude Code / Goose / Hermes")],
      [fn("OPENAI_BASE_URL"), p("="), s("https://api.microdeon.fr/v1")],
      [fn("OPENAI_API_KEY"), p("="), s("mdn_<id>_<secret>")],
      [fn("OPENAI_MODEL"), p("="), s("microdeon/cyberstrike-35b")],
    ],
  },
];
