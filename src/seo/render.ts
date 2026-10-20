import { models } from "../data/models";
import { messages } from "../i18n/catalog";
import { defaultLocale, isLocale, locales } from "../i18n/locales";
import { absoluteUrl, applySeoHtml, buildRobots, buildSitemap, indexablePaths, normalizePath } from "./site";

function bundleFor(pathname: string) {
  const path = normalizePath(pathname);
  const first = path === "/" ? undefined : path.split("/").filter(Boolean)[0];
  const locale = isLocale(first) ? first : defaultLocale;
  return messages[locale];
}

export function renderHtml(html: string, pathname: string) {
  return applySeoHtml(html, pathname, bundleFor(pathname));
}

function line(label: string, href: string, note: string) {
  const text = note.replace(/\s+/g, " ").trim();
  return `- [${label}](${href}): ${text}`;
}

/** Guide pour les agents. Une seule source : /llms.txt. /llm.txt reprend le même texte. */
export function buildLlmsTxt() {
  const fr = messages.fr;
  const en = messages.en;
  const others = locales
    .map((item) => item.code)
    .filter((code) => code !== "fr")
    .join(", ");
  const pages = [
    line("Accueil", absoluteUrl("fr", ""), fr.meta.description),
    line("Modèles", absoluteUrl("fr", "/models"), fr.catalog.lead || fr.catalog.title),
    line("Référence API", absoluteUrl("fr", "/docs"), fr.docs.lead),
  ];
  const sheets = models.map((model) => {
    const copy = fr.modelCopy[model.slug as keyof typeof fr.modelCopy];
    return line(model.displayName, absoluteUrl("fr", `/models/${model.slug}`), copy?.description ?? model.description);
  });
  const english = [
    line("Home", absoluteUrl("en", ""), en.meta.description),
    line("Models", absoluteUrl("en", "/models"), en.catalog.lead || en.catalog.title),
    line("API reference", absoluteUrl("en", "/docs"), en.docs.lead),
  ];
  return `# Microdeon

> ${fr.meta.description}

Microdeon route des modèles d’IA spécialisés en cybersécurité, via une API compatible OpenAI. L’inférence est sur https://api.microdeon.fr/v1. Le site décrit le catalogue, les tarifs horaires en euros et l’usage de l’API. La version de référence est le français. Les mêmes pages existent avec un autre préfixe : ${others}.

La connexion, l’inscription et la console ne sont pas des pages de contenu.

## Pages

${pages.join("\n")}

## Modèles

${sheets.join("\n")}

## English

${english.join("\n")}
`;
}

export { buildRobots, buildSitemap, indexablePaths };
