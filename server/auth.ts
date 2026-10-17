import "./env";

import { betterAuth, type BetterAuthOptions } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

function databaseUrl(): string {
  const raw =
    process.env.BETTER_AUTH_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.MICRODEON_DATABASE_URL ||
    "postgresql://microdeon:microdeon@127.0.0.1:5432/microdeon";
  return raw.replace(/^postgresql\+asyncpg:/, "postgresql:");
}

function socialProviders(): BetterAuthOptions["socialProviders"] {
  const providers: NonNullable<BetterAuthOptions["socialProviders"]> = {};
  const specs = [
    ["github", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
    ["google", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
    ["microsoft", "MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET"],
  ] as const;
  for (const [name, idKey, secretKey] of specs) {
    const clientId = process.env[idKey];
    const clientSecret = process.env[secretKey];
    if (clientId && clientSecret) providers[name] = { clientId, clientSecret };
  }
  return providers;
}

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
}

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:5173";
const trustedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

export const pool = new Pool({ connectionString: databaseUrl() });

const options = {
  secret,
  baseURL,
  trustedOrigins,
  database: {
    dialect: new PostgresDialect({ pool }),
    type: "postgres",
    schemaName: "auth",
  },
  emailAndPassword: { enabled: true },
  socialProviders: socialProviders(),
} satisfies BetterAuthOptions;

await (await getMigrations(options)).runMigrations();

export const auth = betterAuth(options);
