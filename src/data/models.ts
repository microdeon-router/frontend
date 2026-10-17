export type ModelStatus = "candidate" | "preview" | "available" | "coming";
export type Capability = "chat" | "tool_calling" | "reasoning" | "classification" | "routing";
export type Category = "offsec" | "detection" | "reverse" | "forensics" | "nlp" | "router";

export type CatalogModel = {
  id: string;
  slug: string;
  displayName: string;
  short: string;
  description: string;
  upstream: string;
  provider: string;
  vendorLogo?: string;
  status: ModelStatus;
  capabilities: Capability[];
  category: Category;
  contextLength: number;
  maxOutput: number;
  params: string;
  runtime: string;
  pricing: { version: string; inputPerMtok: string; outputPerMtok: string };
  dataPolicy: { zdr: boolean; backend: string; retention: string };
  limitations: string[];
  evaluatedAt: string | null;
};

export const models: CatalogModel[] = [
  {
    id: "microdeon/cyberstrike-35b",
    slug: "cyberstrike-35b",
    displayName: "CyberStrike OffSec 35B",
    short: "MoE offensif, appels d'outils, raisonnement.",
    description:
      "Qwen3.6-35B-A3B MoE affiné pour l'appel d'outils en sécurité offensive (abliterated). Premier candidat open-weight pour un service GPU dédié. En évaluation — non publié.",
    upstream: "huihui-ai/Huihui-CyberStrike-OffSec-35B-abliterated",
    provider: "Runpod · vLLM",
    vendorLogo: "/brand/vendors/huihui/mark.webp",
    status: "candidate",
    capabilities: ["chat", "tool_calling", "reasoning"],
    category: "offsec",
    contextLength: 32768,
    maxOutput: 8192,
    params: "35B MoE",
    runtime: "vLLM",
    pricing: { version: "draft-0", inputPerMtok: "0.50", outputPerMtok: "2.00" },
    dataPolicy: {
      zdr: false,
      backend: "runpod-serverless (worker vLLM)",
      retention: "Conservation des jobs Runpod non vérifiée.",
    },
    limitations: [
      "Licence du modèle de base déclarée « other », droits commerciaux non vérifiés.",
      "Abliterated : refus retirés, fiabilité non mesurée.",
      "Les tokens <think> sont facturés comme de la sortie.",
    ],
    evaluatedAt: null,
  },
  {
    id: "microdeon/orcasaq-cyber-27b",
    slug: "orcasaq-cyber-27b",
    displayName: "OrcaSAQ-2 Cyber 27B",
    short: "GGUF cyber, servi en llama.cpp.",
    description:
      "Candidat cyber distribué au format GGUF, servi par un worker llama.cpp. Conditionné à la qualification (provenance, quantification, évaluation).",
    upstream: "orcarouter / OrcaSAQ-2-Cyber-27B-Uncensored-GGUF",
    provider: "Runpod · llama.cpp",
    vendorLogo: "/brand/vendors/orca-router/mark.jpg",
    status: "candidate",
    capabilities: ["chat"],
    category: "detection",
    contextLength: 16384,
    maxOutput: 4096,
    params: "27B GGUF",
    runtime: "llama.cpp",
    pricing: { version: "draft-0", inputPerMtok: "0.40", outputPerMtok: "1.60" },
    dataPolicy: {
      zdr: false,
      backend: "runpod-serverless (handler llama.cpp)",
      retention: "Files d'attente Runpod ; le worker ne journalise pas le contenu.",
    },
    limitations: [
      "Dépôt gated ; provenance du modèle de base à vérifier.",
      "Impact qualité de la quantification GGUF non mesuré.",
    ],
    evaluatedAt: null,
  },
  {
    id: "microdeon/auto-cyber",
    slug: "auto-cyber",
    displayName: "auto-cyber",
    short: "Routage par catégorie d'usage cyber.",
    description:
      "Identifiant stable de routage. À terme, sélectionne un modèle du catalogue selon la catégorie (offsec, détection, reverse, forensics). Pas encore servi.",
    upstream: "—",
    provider: "Microdeon router",
    status: "coming",
    capabilities: ["routing", "chat"],
    category: "router",
    contextLength: 0,
    maxOutput: 0,
    params: "—",
    runtime: "router",
    pricing: { version: "draft-0", inputPerMtok: "—", outputPerMtok: "—" },
    dataPolicy: {
      zdr: false,
      backend: "n/a",
      retention: "Aucun backend tant que le routage n'est pas activé.",
    },
    limitations: ["Identifiant réservé. Aucune substitution de modèle aujourd'hui."],
    evaluatedAt: null,
  },
  {
    id: "microdeon/whiterabbitneo",
    slug: "whiterabbitneo",
    displayName: "WhiteRabbitNeo",
    short: "Famille à qualifier.",
    description:
      "Famille mentionnée au cadrage. Candidat à la procédure d'admission (licence, compatibilité, evals cyber, exploitation).",
    upstream: "WhiteRabbitNeo",
    provider: "à qualifier",
    status: "coming",
    capabilities: ["chat"],
    category: "offsec",
    contextLength: 0,
    maxOutput: 0,
    params: "—",
    runtime: "—",
    pricing: { version: "draft-0", inputPerMtok: "—", outputPerMtok: "—" },
    dataPolicy: { zdr: false, backend: "n/a", retention: "Non évalué." },
    limitations: ["Hors catalogue servi. Admission non commencée."],
    evaluatedAt: null,
  },
  {
    id: "microdeon/secbert",
    slug: "secbert",
    displayName: "SecBERT",
    short: "Classification / NLP sécurité.",
    description:
      "Potentiellement classification et NLP sécurité, pas nécessairement du chat. Extension future du catalogue, hors endpoint chat/completions tant que le runtime n'est pas défini.",
    upstream: "SecBERT",
    provider: "à qualifier",
    status: "coming",
    capabilities: ["classification"],
    category: "nlp",
    contextLength: 0,
    maxOutput: 0,
    params: "—",
    runtime: "—",
    pricing: { version: "draft-0", inputPerMtok: "—", outputPerMtok: "—" },
    dataPolicy: { zdr: false, backend: "n/a", retention: "Non évalué." },
    limitations: ["Pas un modèle de chat. Pas d'identifiant servi."],
    evaluatedAt: null,
  },
];

export function modelBySlug(slug: string) {
  return models.find((m) => m.slug === slug);
}
