import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/session";

export async function requireAuth(redirectTo: string): Promise<{
  userId: string;
  email: string;
  name: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? verifySessionToken(token) : null;

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(redirectTo)}`);
  }

  return {
    userId: session.sub,
    email: session.email,
    name: session.name,
  };
}
