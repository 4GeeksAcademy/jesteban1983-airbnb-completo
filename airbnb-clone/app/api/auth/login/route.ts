import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from "@/lib/auth/constants";
import { authenticateMockUser } from "@/lib/auth/mock-user-store";
import { createSessionToken } from "@/lib/auth/session";
import { loginSchema } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const payload = await request.json();
  // Validamos el body con Zod antes de tocar cualquier lógica de autenticación.
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Datos inválidos.",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const authResult = authenticateMockUser(parsed.data);
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: 401 });
  }

  const token = createSessionToken({
    userId: authResult.user.id,
    email: authResult.user.email,
    name: authResult.user.name,
  });

  const response = NextResponse.json({
    user: {
      id: authResult.user.id,
      email: authResult.user.email,
      name: authResult.user.name,
    },
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    // httpOnly evita acceso desde JS del navegador y reduce riesgo de XSS.
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });

  return response;
}
