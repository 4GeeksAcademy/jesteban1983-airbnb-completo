import { RoomCard } from "@/components/molecules/RoomCard";
import { RoomsExplorer } from "@/components/organisms/catalog/RoomsExplorer";
import type { Room } from "@/lib/data/rooms";

type HomeTemplateProps = {
  rooms: Room[];
};

export function HomeTemplate({ rooms }: HomeTemplateProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fff 34%,#f7f7f7_100%)] pt-8">
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 sm:pb-16">
        <section className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF385C]">Airbnb vibe</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Alojamientos para tu proxima escapada
          </h1>
          <p className="mt-3 text-zinc-600">
            Busca, filtra y reserva en segundos con una experiencia rapida y clara.
          </p>
        </section>

        <RoomsExplorer rooms={rooms} />

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">Favoritos de la semana</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
