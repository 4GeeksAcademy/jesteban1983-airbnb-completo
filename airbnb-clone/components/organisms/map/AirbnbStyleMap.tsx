import Link from "next/link";

import type { Room } from "@/lib/data/rooms";

type AirbnbStyleMapProps = {
  rooms: Room[];
  title?: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function AirbnbStyleMap({ rooms, title = "Mapa" }: AirbnbStyleMapProps) {
  if (rooms.length === 0) {
    return null;
  }

  const lats = rooms.map((room) => room.lat);
  const lngs = rooms.map((room) => room.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const padding = 0.9;
  const south = minLat - padding;
  const west = minLng - padding;
  const north = maxLat + padding;
  const east = maxLng + padding;

  const bbox = `${west},${south},${east},${north}`;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${centerLat}%2C${centerLng}`;

  const latRange = Math.max(maxLat - minLat, 0.01);
  const lngRange = Math.max(maxLng - minLng, 0.01);

  return (
    <aside className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
        <span className="text-sm text-zinc-500">{rooms.length} alojamientos</span>
      </div>

      <div className="relative h-[420px] w-full bg-zinc-100">
        <iframe
          title="Mapa de alojamientos"
          src={embedSrc}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="pointer-events-none absolute inset-0">
          {rooms.map((room) => {
            const x = clamp(((room.lng - minLng) / lngRange) * 72 + 14, 12, 88);
            const y = clamp((1 - (room.lat - minLat) / latRange) * 66 + 17, 14, 86);

            return (
              <Link
                key={room.id}
                href={`/rooms/${room.id}`}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-xs font-semibold text-white shadow-md transition hover:scale-105"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                ${room.nightlyPrice}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}