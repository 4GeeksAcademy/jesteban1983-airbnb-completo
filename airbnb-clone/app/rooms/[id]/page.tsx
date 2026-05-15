import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { AirbnbStyleMap } from "@/components/organisms/map/AirbnbStyleMap";
import { getRoomById } from "@/lib/data/rooms";

type RoomDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: RoomDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    return {
      title: "Habitacion no encontrada",
      description: "El alojamiento solicitado no existe.",
    };
  }

  return {
    title: room.title,
    description: `${room.city}, ${room.country}. Reserva desde $${room.nightlyPrice} por noche.`,
    openGraph: {
      title: room.title,
      description: room.description,
      images: [{ url: room.imageUrl }],
      type: "article",
    },
  };
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: room.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: room.city,
      addressCountry: room.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: room.rating,
      reviewCount: room.reviews,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: room.nightlyPrice,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-72 w-full">
          <Image
            src={room.imageUrl}
            alt={room.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <section className="space-y-4 p-6">
          <h1 className="text-3xl font-semibold text-zinc-900">{room.title}</h1>
          <p className="text-zinc-600">
            {room.city}, {room.country} · ★ {room.rating} ({room.reviews} reviews)
          </p>
          <p className="text-zinc-700">{room.description}</p>
          <p className="text-lg font-semibold text-zinc-900">${room.nightlyPrice} / noche</p>

          <Link
            href={`/checkout?roomId=${room.id}&checkIn=2026-06-15&checkOut=2026-06-18`}
            className="inline-block"
          >
            <Button>Reservar ahora</Button>
          </Link>
        </section>
      </div>

      <section className="mt-6">
        <AirbnbStyleMap rooms={[room]} title={`Ubicacion en ${room.city}`} />
      </section>
    </main>
  );
}
