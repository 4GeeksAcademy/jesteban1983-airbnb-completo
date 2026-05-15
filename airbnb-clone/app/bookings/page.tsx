import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { requireAuth } from "@/lib/auth/require-auth";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Gestiona tus reservas activas y pasadas.",
};

export default async function BookingsPage() {
  const session = await requireAuth("/bookings");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-zinc-900">Reservas de {session.name}</h1>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-zinc-600">
          Todavia no tienes reservas confirmadas en este MVP.
        </p>

        <Link href="/" className="mt-4 inline-block">
          <Button>Explorar alojamientos</Button>
        </Link>
      </section>
    </main>
  );
}
