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
  pricing: { perHour: string; gpu: string; from?: boolean };
  dataPolicy: { zdr: boolean; backend: string; retention: string };
  limitations: string[];
  evaluatedAt: string | null;
};

/**
 * Tarif public = RunPod Secure Cloud (oct. 2026) × 0,92 USD/EUR × 2,2, arrondi.
 * CyberStrike : 1× H100 80GB FP8 (2,89 $/h) → 5,99 €/h
 * OrcaSAQ : 1× RTX 4090 (0,89 $/h) → 1,89 €/h
 * WhiteRabbitNeo : 1× L40S 48GB (1,09 $/h) → 2,29 €/h
 * SecBERT : 1× L4 24GB (0,59 $/h) → 1,19 €/h
 * auto-cyber : tarif du modèle routé, affiché à partir du chat le moins cher
 */
export const models: CatalogModel[] = [
  {
    id: "microdeon/cyberstrike-35b",
    slug: "cyberstrike-35b",
    displayName: "CyberStrike OffSec 35B",
    short: "MoE offensif, appels d'outils, raisonnement.",
    description:
      "MoE Qwen 35B (A3B) affiné pour l'appel d'outils en sécurité offensive. Servi en vLLM sur un H100 dédié.",
    upstream: "huihui-ai/Huihui-CyberStrike-OffSec-35B-abliterated",
    provider: "Runpod · vLLM",
    vendorLogo: "/brand/vendors/huihui/mark.webp",
    status: "available",
    capabilities: ["chat", "tool_calling", "reasoning"],
    category: "offsec",
    contextLength: 32768,
    maxOutput: 8192,
    params: "35B MoE",
    runtime: "vLLM",
    pricing: { perHour: "5.99", gpu: "H100 80GB" },
    dataPolicy: {
      zdr: true,
      backend: "Runpod Secure Cloud · vLLM",
      retention: "Microdeon ne conserve ni les prompts ni les réponses.",
    },
    limitations: [
      "Abliterated : les filtres de refus du modèle de base sont retirés.",
      "Les traces de raisonnement (<think>) font partie de la génération.",
    ],
    evaluatedAt: "2026-10-17",
  },
  {
    id: "microdeon/orcasaq-cyber-27b",
    slug: "orcasaq-cyber-27b",
    displayName: "OrcaSAQ-2 Cyber 27B",
    short: "GGUF cyber, servi en llama.cpp.",
    description: "Modèle cyber 27B en GGUF, servi par llama.cpp. Détection, analyse et assistance SOC.",
    upstream: "orcarouter / OrcaSAQ-2-Cyber-27B-Uncensored-GGUF",
    provider: "Runpod · llama.cpp",
    vendorLogo: "/brand/vendors/orca-router/mark.jpg",
    status: "available",
    capabilities: ["chat"],
    category: "detection",
    contextLength: 16384,
    maxOutput: 4096,
    params: "27B GGUF",
    runtime: "llama.cpp",
    pricing: { perHour: "1.89", gpu: "RTX 4090" },
    dataPolicy: {
      zdr: true,
      backend: "Runpod Secure Cloud · llama.cpp",
      retention: "Microdeon ne conserve ni les prompts ni les réponses.",
    },
    limitations: ["Poids GGUF. Le dépôt amont est gated ; l’inférence passe par nos workers."],
    evaluatedAt: "2026-10-17",
  },
  {
    id: "microdeon/auto-cyber",
    slug: "auto-cyber",
    displayName: "auto-cyber",
    short: "Routage par catégorie d'usage cyber.",
    description:
      "Identifiant de routage. Sélectionne un modèle du catalogue selon la catégorie (offsec, détection, reverse, forensics). Le tarif horaire est celui du modèle servi.",
    upstream: "-",
    provider: "Microdeon router",
    status: "available",
    capabilities: ["routing", "chat"],
    category: "router",
    contextLength: 32768,
    maxOutput: 8192,
    params: "-",
    runtime: "router",
    pricing: { perHour: "1.89", gpu: "Routage", from: true },
    dataPolicy: {
      zdr: true,
      backend: "Microdeon router",
      retention: "Microdeon ne conserve ni les prompts ni les réponses.",
    },
    limitations: ["Le tarif horaire suit le modèle effectivement routé."],
    evaluatedAt: "2026-10-17",
  },
  {
    id: "microdeon/whiterabbitneo",
    slug: "whiterabbitneo",
    displayName: "WhiteRabbitNeo",
    short: "Offsec, pentest, assistance offensive.",
    description: "Famille WhiteRabbitNeo pour le pentest et l’assistance offensive, servie sur GPU dédié.",
    upstream: "WhiteRabbitNeo",
    provider: "Runpod · vLLM",
    status: "available",
    capabilities: ["chat"],
    category: "offsec",
    contextLength: 32768,
    maxOutput: 8192,
    params: "33B",
    runtime: "vLLM",
    pricing: { perHour: "2.29", gpu: "L40S 48GB" },
    dataPolicy: {
      zdr: true,
      backend: "Runpod Secure Cloud · vLLM",
      retention: "Microdeon ne conserve ni les prompts ni les réponses.",
    },
    limitations: [],
    evaluatedAt: "2026-10-17",
  },
  {
    id: "microdeon/secbert",
    slug: "secbert",
    displayName: "SecBERT",
    short: "Classification et NLP sécurité.",
    description: "Encodeur BERT spécialisé sécurité : classification de logs, tickets et textes d’incident.",
    upstream: "SecBERT",
    provider: "Runpod · inference",
    status: "available",
    capabilities: ["classification"],
    category: "nlp",
    contextLength: 512,
    maxOutput: 0,
    params: "BERT",
    runtime: "transformers",
    pricing: { perHour: "1.19", gpu: "L4 24GB" },
    dataPolicy: {
      zdr: true,
      backend: "Runpod Secure Cloud",
      retention: "Microdeon ne conserve ni les prompts ni les réponses.",
    },
    limitations: ["Encodeur : pas un modèle de chat."],
    evaluatedAt: "2026-10-17",
  },
];

export function modelBySlug(slug: string) {
  return models.find((m) => m.slug === slug);
}
