import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { rooms } from "@/lib/data/rooms";

export default function DetallePage() {
  const featuredRoom = rooms[0];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 pt-8 sm:pb-16">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF385C]">Detalle</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Vista rapida del alojamiento destacado
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          En esta seccion puedes entrar al detalle completo del anuncio y continuar con la reserva.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-400"
            >
              <p className="font-semibold text-zinc-900">{room.title}</p>
              <p className="mt-1 text-sm text-zinc-600">
                {room.city}, {room.country}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href={`/rooms/${featuredRoom.id}`}>
            <Button>Ir al detalle principal</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}