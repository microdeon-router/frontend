import { authClient } from "@/lib/auth-client";

type AuthUser = { id?: string; email?: string | null };

export function isSignedIn(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const user = "user" in data ? (data as { user?: AuthUser }).user : undefined;
  return Boolean(user && (user.id || user.email));
}

export function useAuthSession() {
  const { data, isPending } = authClient.useSession();
  const signedIn = isSignedIn(data);
  return {
    data: signedIn ? data : null,
    user: signedIn ? data?.user : null,
    isPending,
    signedIn,
  };
}
