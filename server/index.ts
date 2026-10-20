import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import { auth } from "./auth";

const port = Number(process.env.BETTER_AUTH_PORT ?? 3001);
const host = process.env.BETTER_AUTH_HOST ?? "127.0.0.1";

async function readBody(req: IncomingMessage): Promise<Buffer | undefined> {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function toHeaders(req: IncomingMessage): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, value);
    }
  }
  return headers;
}

function allowedOrigin(origin: string | undefined): string | null {
  if (!origin) return null;
  const allowed = (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return allowed.includes(origin) ? origin : null;
}

function applyCors(res: ServerResponse, origin: string | undefined) {
  const allow = allowedOrigin(origin);
  if (!allow) return;
  res.setHeader("access-control-allow-origin", allow);
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("vary", "origin");
}

async function send(res: ServerResponse, response: Response, origin: string | undefined) {
  const headers: Record<string, string | string[]> = {};
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;
    headers[key] = value;
  });
  const cookies = response.headers.getSetCookie();
  if (cookies.length > 0) headers["set-cookie"] = cookies;
  applyCors(res, origin);
  res.writeHead(response.status, headers);
  res.end(Buffer.from(await response.arrayBuffer()));
}

const server = createServer(async (req, res) => {
  try {
    const host = req.headers.host ?? `127.0.0.1:${port}`;
    const url = new URL(req.url ?? "/", `http://${host}`);
    const origin = req.headers.origin;
    if (!url.pathname.startsWith("/api/auth")) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    if (req.method === "OPTIONS") {
      applyCors(res, origin);
      res.setHeader("access-control-allow-methods", "GET, POST, OPTIONS");
      res.setHeader("access-control-allow-headers", "content-type, authorization");
      res.writeHead(204);
      res.end();
      return;
    }
    const body = await readBody(req);
    const request = new Request(url, {
      method: req.method,
      headers: toHeaders(req),
      body: body && body.length > 0 ? new Uint8Array(body) : undefined,
    });
    await send(res, await auth.handler(request), origin);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("Auth server error");
  }
});

server.listen(port, host, () => {
  console.log(`Better Auth listening on http://${host}:${port}`);
});
