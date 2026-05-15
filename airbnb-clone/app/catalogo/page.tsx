import { AirbnbStyleMap } from "@/components/organisms/map/AirbnbStyleMap";
import { RoomsExplorer } from "@/components/organisms/catalog/RoomsExplorer";
import { rooms } from "@/lib/data/rooms";

export default function CatalogoPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:pb-16">
      <section className="mb-6 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF385C]">Catalogo</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Explora estancias disponibles
        </h1>
        <p className="mt-3 text-zinc-600">
          Usa el buscador, pulsa Buscar o afina por filtros para encontrar tu match ideal.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <RoomsExplorer rooms={rooms} />
        <div className="h-fit xl:sticky xl:top-24">
          <AirbnbStyleMap rooms={rooms} title="Mapa de resultados" />
        </div>
      </div>
    </main>
  );
}