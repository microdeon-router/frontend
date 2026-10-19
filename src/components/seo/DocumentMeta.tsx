import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/i18n";
import { STORAGE_KEY } from "@/i18n/locales";
import { headExtras, resolveSeo } from "@/seo/site";

function setMeta(name: "description" | "robots", content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { m } = useI18n();

  useEffect(() => {
    const seo = resolveSeo(pathname, m);
    document.documentElement.lang = seo.lang;
    document.documentElement.dir = seo.dir;
    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("robots", seo.robots);

    document.head.querySelectorAll("[data-microdeon-seo]").forEach((node) => node.remove());
    const extra = headExtras(seo);
    for (const link of extra.links) {
      const el = document.createElement("link");
      el.setAttribute("data-microdeon-seo", "1");
      el.rel = link.rel;
      el.href = link.href;
      if (link.hreflang) el.hreflang = link.hreflang;
      document.head.appendChild(el);
    }
    for (const meta of extra.metas) {
      const el = document.createElement("meta");
      el.setAttribute("data-microdeon-seo", "1");
      el.setAttribute(meta.attr, meta.key);
      el.setAttribute("content", meta.content);
      document.head.appendChild(el);
    }
    if (seo.persistLocale) {
      try {
        localStorage.setItem(STORAGE_KEY, seo.locale);
      } catch {
        /* ignore */
      }
    }
  }, [pathname, m]);

  return null;
}
