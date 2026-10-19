import { createAuthClient } from "better-auth/react";

async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json") || contentType.includes("text/event-stream")) {
    return response;
  }
  return new Response(JSON.stringify({ message: "Auth API unavailable" }), {
    status: 503,
    headers: { "content-type": "application/json" },
  });
}

export const authClient = createAuthClient({
  fetchOptions: {
    customFetchImpl: authFetch,
  },
});
