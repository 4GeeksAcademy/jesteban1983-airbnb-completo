import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { SESSION_TTL_SECONDS } from "@/lib/auth/constants";

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "dev-only-insecure-secret-change-me";
}

function base64urlEncode(value: string): string {
  return Buffer.from(value, "utf-8").toString("base64url");
}

function base64urlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf-8");
}

function signPayload(payloadBase64: string): string {
  // Firmamos el payload para detectar cualquier manipulación del token en el navegador.
  return createHmac("sha256", getSessionSecret())
    .update(payloadBase64)
    .digest("base64url");
}

export function createSessionToken(input: {
  userId: string;
  email: string;
  name: string;
}): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: input.userId,
    email: input.email,
    name: input.name,
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
  };

  const payloadBase64 = base64urlEncode(JSON.stringify(payload));
  const signature = signPayload(payloadBase64);

  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payloadBase64);
  const givenBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  // timingSafeEqual evita filtraciones por tiempo en la comparación de firmas.
  if (givenBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(givenBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64urlDecode(payloadBase64)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    // Si expira, la sesión deja de ser válida y obligamos un nuevo login.
    if (payload.exp <= now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
