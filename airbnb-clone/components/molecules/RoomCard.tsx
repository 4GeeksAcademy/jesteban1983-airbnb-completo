import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import type { Room } from "@/lib/data/rooms";

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.imageUrl}
          alt={room.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-zinc-900">{room.title}</h3>
          <span className="text-sm font-medium text-zinc-700">★ {room.rating}</span>
        </div>
        <p className="text-sm text-zinc-600">
          {room.city}, {room.country}
        </p>
        <p className="text-sm text-zinc-900">
          <span className="font-semibold">${room.nightlyPrice}</span> por noche
        </p>
        <div className="flex gap-2 pt-1">
          <Link href={`/rooms/${room.id}`} className="flex-1">
            <Button variant="ghost" className="w-full">
              Ver detalle
            </Button>
          </Link>
          <Link
            href={`/checkout?roomId=${room.id}&checkIn=2026-06-15&checkOut=2026-06-18`}
            className="flex-1"
          >
            <Button className="w-full">Reservar</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
