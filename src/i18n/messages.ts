export type Messages = {
  meta: { title: string; description: string };
  nav: {
    models: string;
    docs: string;
    dashboard: string;
    signin: string;
    signOut: string;
    signup: string;
    getKey: string;
    goToConsole: string;
    search: string;
    close: string;
  };
  lang: { label: string; hint: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    lead: string;
    cta: string;
    browse: string;
    from: string;
    via: string;
    to: string;
  };
  stats: { items: { value: string; label: string }[] };
  code: { copy: string; copied: string; moreAgents: string; yourAgent: string };
  agents: { kicker: string; title: string; lead: string };
  tools: { kicker: string; title: string; lead: string };
  integrate: { kicker: string; title: string; lead: string; cta: string };
  carousel: { kicker: string; title: string };
  catalog: {
    kicker: string;
    title: string;
    lead: string;
    all: string;
    empty: string;
    from: string;
    perHour: string;
    context: string;
    view: string;
    filters: string;
    search: string;
    status: string;
    capability: string;
    category: string;
  };
  status: {
    candidate: string;
    preview: string;
    available: string;
    coming: string;
  };
  cap: {
    chat: string;
    tool_calling: string;
    reasoning: string;
    classification: string;
    routing: string;
  };
  cat: {
    offsec: string;
    detection: string;
    reverse: string;
    forensics: string;
    nlp: string;
    router: string;
  };
  model: {
    specs: string;
    pricing: string;
    gpu: string;
    context: string;
    policy: string;
    limits: string;
    upstream: string;
    runtime: string;
    params: string;
    output: string;
    zdr: string;
    zdrNo: string;
    evaluated: string;
    notEvaluated: string;
    back: string;
    use: string;
  };
  how: {
    kicker: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  tryIt: {
    kicker: string;
    title: string;
    lead: string;
    cta: string;
  };
  docs: {
    title: string;
    lead: string;
    toc: string;
    base: string;
    auth: string;
    authBody: string;
    endpoints: string;
    chat: string;
    chatBody: string;
    models: string;
    modelsBody: string;
    usage: string;
    usageBody: string;
    keys: string;
    keysBody: string;
    errors: string;
    headers: string;
    agents: string;
    agentsBody: string;
    streaming: string;
    billing: string;
    billingBody: string;
  };
  dash: {
    title: string;
    lead: string;
    concept: string;
    balance: string;
    month: string;
    requests: string;
    tokens: string;
    keys: string;
    newKey: string;
    topup: string;
    topupSoon: string;
    stripe: string;
    ledger: string;
    noUsage: string;
    scope: string;
    created: string;
    revoke: string;
    prompt: string;
    send: string;
    empty: string;
    working: string;
    failed: string;
    needKey: string;
    keyPh: string;
    clear: string;
  };
  auth: {
    signinTitle: string;
    signupTitle: string;
    continue: string;
    orEmail: string;
    email: string;
    password: string;
    name: string;
    submitIn: string;
    submitUp: string;
    pending: string;
    failed: string;
    noAccount: string;
    hasAccount: string;
    note: string;
    mail: string;
  };
  footer: {
    tagline: string;
    product: string;
    developers: string;
    company: string;
    legal: string;
    status: string;
    privacy: string;
    terms: string;
    security: string;
    contact: string;
    copyright: string;
  };
  search: {
    placeholder: string;
    empty: string;
    pages: string;
    models: string;
  };
  notFound: { title: string; body: string; home: string };
  common: { example: string; soon: string; close: string };
  modelCopy: Record<
    "cyberstrike-35b" | "orcasaq-cyber-27b" | "auto-cyber" | "whiterabbitneo" | "secbert",
    { short: string; description: string }
  >;
};

export function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
