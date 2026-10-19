import { messages } from "../i18n/catalog";
import { defaultLocale, isLocale } from "../i18n/locales";
import { applySeoHtml, buildRobots, buildSitemap, indexablePaths, normalizePath } from "./site";

function bundleFor(pathname: string) {
  const path = normalizePath(pathname);
  const first = path === "/" ? undefined : path.split("/").filter(Boolean)[0];
  const locale = isLocale(first) ? first : defaultLocale;
  return messages[locale];
}

export function renderHtml(html: string, pathname: string) {
  return applySeoHtml(html, pathname, bundleFor(pathname));
}

export { buildRobots, buildSitemap, indexablePaths };
