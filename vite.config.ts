import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { buildRobots, buildSitemap, indexablePaths, renderHtml } from "./src/seo/render";

function microdeonSeo(): Plugin {
  const serveSeo = (req: { url?: string }, res: { setHeader: (k: string, v: string) => void; end: (body: string) => void }, next: () => void) => {
    const url = req.url?.split("?")[0];
    if (url === "/sitemap.xml") {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.end(buildSitemap());
      return;
    }
    if (url === "/robots.txt") {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(buildRobots());
      return;
    }
    next();
  };

  return {
    name: "microdeon-seo",
    configureServer(server) {
      server.middlewares.use(serveSeo);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveSeo);
    },
    writeBundle(options) {
      const dir = options.dir;
      if (!dir) return;
      const shellPath = path.join(dir, "index.html");
      const shell = fs.readFileSync(shellPath, "utf8");
      fs.writeFileSync(shellPath, renderHtml(shell, "/"));
      for (const { locale, suffix } of indexablePaths()) {
        const urlPath = `/${locale}${suffix}`;
        const file = path.join(dir, ...urlPath.split("/").filter(Boolean), "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderHtml(shell, urlPath));
      }
      fs.writeFileSync(path.join(dir, "sitemap.xml"), buildSitemap());
      fs.writeFileSync(path.join(dir, "robots.txt"), buildRobots());
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), microdeonSeo()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
      },
    },
  },
});
