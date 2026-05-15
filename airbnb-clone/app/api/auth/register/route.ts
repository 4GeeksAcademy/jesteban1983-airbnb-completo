import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from "@/lib/auth/constants";
import { createMockUser } from "@/lib/auth/mock-user-store";
import { createSessionToken } from "@/lib/auth/session";
import { registerSchema } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const payload = await request.json();
  // El servidor vuelve a validar para no confiar nunca en el cliente.
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Datos inválidos.",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const createResult = createMockUser(parsed.data);
  if (!createResult.ok) {
    return NextResponse.json({ error: createResult.error }, { status: 409 });
  }

  const token = createSessionToken({
    userId: createResult.user.id,
    email: createResult.user.email,
    name: createResult.user.name,
  });

  const response = NextResponse.json({
    user: {
      id: createResult.user.id,
      email: createResult.user.email,
      name: createResult.user.name,
    },
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    // sameSite=strict ayuda a mitigar CSRF en este flujo de MVP.
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });

  return response;
}
