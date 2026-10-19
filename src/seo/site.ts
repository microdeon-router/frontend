import { modelBySlug, models } from "../data/models";
import type { Messages } from "../i18n/messages";
import { defaultLocale, isLocale, locales, type Locale } from "../i18n/locales";

/** Origine canonique du portail. L’API publique est sur un autre hôte (api.microdeon.fr). */
export const DEFAULT_ORIGIN = "https://microdeon.fr";

const BRAND = "Microdeon";

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
  zh: "zh_CN",
  hi: "hi_IN",
  id: "id_ID",
  pt: "pt_BR",
  ar: "ar_AR",
  bn: "bn_BD",
  ru: "ru_RU",
  ja: "ja_JP",
};

export type PageKind =
  | "home"
  | "models"
  | "model"
  | "docs"
  | "dashboard"
  | "signin"
  | "signup"
  | "notFound";

export type SeoPage = {
  indexable: boolean;
  locale: Locale;
  kind: PageKind;
  /** Chemin après le préfixe de langue. Vide pour l’accueil. */
  suffix: string;
  slug?: string;
  title: string;
  description: string;
  robots: "index, follow" | "noindex, follow";
  canonical?: string;
  lang: Locale;
  dir: "ltr" | "rtl";
  /** La langue est dans l’URL : on peut la mémoriser. */
  persistLocale: boolean;
  alternates: { hreflang: string; href: string }[];
};

export type HeadLink = { rel: "canonical" | "alternate"; href: string; hreflang?: string };
export type HeadMeta = { attr: "name" | "property"; key: string; content: string };

export function siteOrigin() {
  const fromVite = import.meta.env?.VITE_SITE_URL?.trim();
  if (fromVite) return fromVite.replace(/\/$/, "");
  const fromNode = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.VITE_SITE_URL?.trim();
  if (fromNode) return fromNode.replace(/\/$/, "");
  return DEFAULT_ORIGIN;
}

export function normalizePath(pathname: string) {
  const bare = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare || "/";
}

export function absoluteUrl(locale: Locale, suffix: string) {
  return `${siteOrigin()}/${locale}${suffix}`;
}

/** Même page, autre langue. Les ancres et la query (aucune n’est canonique) sont conservées pour la navigation. */
export function swapLocale(pathname: string, search: string, hash: string, locale: Locale) {
  const path = normalizePath(pathname);
  const parts = path.split("/");
  if (isLocale(parts[1])) {
    parts[1] = locale;
    return `${parts.join("/")}${search}${hash}`;
  }
  return `/${locale}${search}${hash}`;
}

const PUBLIC_SUFFIXES = ["", "/models", "/docs", ...models.map((model) => `/models/${model.slug}`)];

export function indexablePaths() {
  return locales.flatMap((item) => PUBLIC_SUFFIXES.map((suffix) => ({ locale: item.code, suffix })));
}

function alternatesFor(suffix: string): { hreflang: string; href: string }[] {
  return [
    ...locales.map((item) => ({
      hreflang: item.code,
      href: absoluteUrl(item.code, suffix),
    })),
    { hreflang: "x-default", href: absoluteUrl(defaultLocale, suffix) },
  ];
}

function titled(label: string) {
  return `${label} · ${BRAND}`;
}

function copyFor(m: Messages, kind: PageKind, slug?: string) {
  switch (kind) {
    case "home":
      return { title: m.meta.title, description: m.meta.description };
    case "models":
      return { title: titled(m.catalog.title), description: m.catalog.lead || m.catalog.title };
    case "docs":
      return { title: titled(m.docs.title), description: m.docs.lead };
    case "model": {
      const model = slug ? modelBySlug(slug) : undefined;
      const localized = model ? m.modelCopy[model.slug as keyof Messages["modelCopy"]] : undefined;
      return {
        title: titled(model?.displayName ?? m.notFound.title),
        description: localized?.description ?? model?.description ?? m.notFound.body,
      };
    }
    case "dashboard":
      return { title: titled(m.dash.title), description: m.dash.lead };
    case "signin":
      return { title: titled(m.auth.signinTitle), description: m.footer.tagline };
    case "signup":
      return { title: titled(m.auth.signupTitle), description: m.footer.tagline };
    default:
      return { title: titled(m.notFound.title), description: m.notFound.body };
  }
}

function page(
  locale: Locale,
  kind: PageKind,
  suffix: string,
  indexable: boolean,
  persistLocale: boolean,
  m: Messages,
  slug?: string,
): SeoPage {
  const copy = copyFor(m, kind, slug);
  return {
    indexable,
    locale,
    kind,
    suffix,
    slug,
    title: copy.title,
    description: copy.description.replace(/\s+/g, " ").trim(),
    robots: indexable ? "index, follow" : "noindex, follow",
    canonical: indexable ? absoluteUrl(locale, suffix) : undefined,
    lang: locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    persistLocale,
    alternates: indexable ? alternatesFor(suffix) : [],
  };
}

export function resolveSeo(pathname: string, m: Messages): SeoPage {
  const path = normalizePath(pathname);
  // `/` ne fait que rediriger vers la langue détectée. Ce n’est pas une page :
  // pas de canonical, pas de hreflang, et on ne l’indexe pas.
  if (path === "/") {
    const copy = copyFor(m, "home");
    return {
      indexable: false,
      locale: defaultLocale,
      kind: "home",
      suffix: "",
      title: copy.title,
      description: copy.description,
      robots: "noindex, follow",
      lang: defaultLocale,
      dir: "ltr",
      persistLocale: false,
      alternates: [],
    };
  }
  const parts = path.split("/").filter(Boolean);
  const locale = isLocale(parts[0]) ? parts[0] : null;
  if (!locale) return page(defaultLocale, "notFound", "", false, false, m);

  const rest = parts.slice(1);
  if (rest.length === 0) return page(locale, "home", "", true, true, m);
  if (rest.length === 1 && rest[0] === "models") return page(locale, "models", "/models", true, true, m);
  if (rest.length === 1 && rest[0] === "docs") return page(locale, "docs", "/docs", true, true, m);
  if (rest.length === 2 && rest[0] === "models") {
    const model = modelBySlug(rest[1]);
    if (!model) return page(locale, "notFound", "", false, true, m);
    return page(locale, "model", `/models/${model.slug}`, true, true, m, model.slug);
  }
  if (rest[0] === "dashboard") return page(locale, "dashboard", "/dashboard", false, true, m);
  if (rest[0] === "signin") return page(locale, "signin", "/signin", false, true, m);
  if (rest[0] === "signup") return page(locale, "signup", "/signup", false, true, m);
  return page(locale, "notFound", "", false, true, m);
}

export function headExtras(seo: SeoPage): { links: HeadLink[]; metas: HeadMeta[] } {
  if (!seo.indexable || !seo.canonical) return { links: [], metas: [] };
  const origin = siteOrigin();
  const image = `${origin}/brand/microdeon/mark.png`;
  const links: HeadLink[] = [
    { rel: "canonical", href: seo.canonical },
    ...seo.alternates.map((item) => ({ rel: "alternate" as const, href: item.href, hreflang: item.hreflang })),
  ];
  const metas: HeadMeta[] = [
    { attr: "property", key: "og:site_name", content: BRAND },
    { attr: "property", key: "og:type", content: "website" },
    { attr: "property", key: "og:title", content: seo.title },
    { attr: "property", key: "og:description", content: seo.description },
    { attr: "property", key: "og:url", content: seo.canonical },
    { attr: "property", key: "og:image", content: image },
    { attr: "property", key: "og:image:width", content: "1024" },
    { attr: "property", key: "og:image:height", content: "1024" },
    { attr: "property", key: "og:image:alt", content: BRAND },
    { attr: "property", key: "og:locale", content: OG_LOCALE[seo.locale] },
    { attr: "name", key: "twitter:card", content: "summary" },
    { attr: "name", key: "twitter:title", content: seo.title },
    { attr: "name", key: "twitter:description", content: seo.description },
    { attr: "name", key: "twitter:image", content: image },
  ];
  return { links, metas };
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function seoHeadBlock(pathname: string, m: Messages) {
  const seo = resolveSeo(pathname, m);
  const extra = headExtras(seo);
  const lines = extra.links.map((link) => {
    const lang = link.hreflang ? ` hreflang="${esc(link.hreflang)}"` : "";
    return `<link data-microdeon-seo="1" rel="${link.rel}"${lang} href="${esc(link.href)}" />`;
  });
  for (const meta of extra.metas) {
    lines.push(
      `<meta data-microdeon-seo="1" ${meta.attr}="${esc(meta.key)}" content="${esc(meta.content)}" />`,
    );
  }
  return { seo, html: lines.join("\n    ") };
}

/** Injecte le head dans le shell Vite. Le corps reste celui de l’application : pas de contenu différent pour les robots. */
function mustReplace(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) throw new Error(`SEO: balise introuvable (${label})`);
  return html.replace(pattern, replacement);
}

export function applySeoHtml(html: string, pathname: string, m: Messages) {
  const { seo, html: block } = seoHeadBlock(pathname, m);
  const dir = seo.dir === "rtl" ? ' dir="rtl"' : "";
  let next = mustReplace(html, /<html lang="[^"]*"(?:\s+dir="[^"]*")?/, `<html lang="${seo.lang}"${dir}`, "html");
  next = mustReplace(next, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`, "title");
  next = mustReplace(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(seo.description)}" />`,
    "description",
  );
  next = mustReplace(
    next,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${seo.robots}" />`,
    "robots",
  );
  return mustReplace(
    next,
    /<!--microdeon-seo-->[\s\S]*?<!--\/microdeon-seo-->/,
    `<!--microdeon-seo-->\n    ${block}\n    <!--/microdeon-seo-->`,
    "marker",
  );
}

function xml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildSitemap() {
  const urls = PUBLIC_SUFFIXES.flatMap((suffix) =>
    locales.map((item) => `  <url><loc>${xml(absoluteUrl(item.code, suffix))}</loc></url>`),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function buildRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteOrigin()}/sitemap.xml\n`;
}
