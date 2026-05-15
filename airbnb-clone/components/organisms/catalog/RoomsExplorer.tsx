"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { RoomCard } from "@/components/molecules/RoomCard";
import type { Room } from "@/lib/data/rooms";

type RoomsExplorerProps = {
  rooms: Room[];
};

type PriceFilter = "all" | "budget" | "premium";

export function RoomsExplorer({ rooms }: RoomsExplorerProps) {
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");

  const cities = useMemo(
    () => ["all", ...new Set(rooms.map((room) => room.city.toLowerCase()))],
    [rooms],
  );

  const filteredRooms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesText =
        normalizedQuery.length === 0 ||
        room.title.toLowerCase().includes(normalizedQuery) ||
        room.city.toLowerCase().includes(normalizedQuery) ||
        room.country.toLowerCase().includes(normalizedQuery);

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "budget" && room.nightlyPrice < 170) ||
        (priceFilter === "premium" && room.nightlyPrice >= 170);

      const matchesCity = cityFilter === "all" || room.city.toLowerCase() === cityFilter;

      return matchesText && matchesPrice && matchesCity;
    });
  }, [rooms, query, priceFilter, cityFilter]);

  return (
    <section className="space-y-5">
      <form
        className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="grid gap-2 md:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3 focus-within:border-[#FF385C]">
            <span className="text-sm text-zinc-500">Buscar</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ciudad, pais o tipo de alojamiento"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </label>
          <Button type="submit" className="h-full min-h-12 rounded-2xl px-6">
            Buscar
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { key: "all", label: "Todos" },
            { key: "budget", label: "Economicos" },
            { key: "premium", label: "Premium" },
          ].map((option) => {
            const isActive = priceFilter === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setPriceFilter(option.key as PriceFilter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#FF385C] bg-[#ff385c] text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
                }`}
              >
                {option.label}
              </button>
            );
          })}

          {cities.map((city) => {
            const isActive = cityFilter === city;
            const label = city === "all" ? "Todas las ciudades" : city;

            return (
              <button
                key={city}
                type="button"
                onClick={() => setCityFilter(city)}
                className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition ${
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </form>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-zinc-600">
          {filteredRooms.length} resultado{filteredRooms.length === 1 ? "" : "s"}
        </p>
        <p className="text-sm text-zinc-500">Autofiltrado en tiempo real</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
          No encontramos alojamientos con esos criterios.
        </div>
      ) : null}
    </section>
  );
}