import type { Metadata } from "next";

import { requireAuth } from "@/lib/auth/require-auth";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Zona privada del usuario autenticado.",
};

export default async function ProfilePage() {
  const session = await requireAuth("/profile");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-zinc-900">Tu perfil</h1>
      <p className="mt-2 text-zinc-600">Gestiona tus datos y preferencias de viaje.</p>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Nombre</p>
        <p className="text-lg font-medium text-zinc-900">{session.name}</p>

        <p className="mt-4 text-sm text-zinc-500">Correo</p>
        <p className="text-lg font-medium text-zinc-900">{session.email}</p>
      </section>
    </main>
  );
}
