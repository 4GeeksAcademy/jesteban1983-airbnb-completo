import "server-only";

import { createHash, randomUUID } from "node:crypto";

type MockUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const usersByEmail = new Map<string, MockUser>();

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function createMockUser(input: {
  name: string;
  email: string;
  password: string;
}): { ok: true; user: Omit<MockUser, "passwordHash"> } | { ok: false; error: string } {
  const normalizedEmail = normalizeEmail(input.email);

  if (usersByEmail.has(normalizedEmail)) {
    return { ok: false, error: "Este correo ya está registrado." };
  }

  const user: MockUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(input.password),
  };

  usersByEmail.set(normalizedEmail, user);
  return {
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

export function authenticateMockUser(input: {
  email: string;
  password: string;
}): { ok: true; user: Omit<MockUser, "passwordHash"> } | { ok: false; error: string } {
  const normalizedEmail = normalizeEmail(input.email);
  const user = usersByEmail.get(normalizedEmail);

  if (!user) {
    return { ok: false, error: "Credenciales inválidas." };
  }

  if (user.passwordHash !== hashPassword(input.password)) {
    return { ok: false, error: "Credenciales inválidas." };
  }

  return {
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  };
}
