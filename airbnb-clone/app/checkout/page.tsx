import type { Metadata } from "next";

import { CheckoutForm } from "@/components/organisms/checkout/CheckoutForm";
import { requireAuth } from "@/lib/auth/require-auth";
import { calculateBookingTotal, calculateStayNights } from "@/lib/booking/pricing";
import { getRoomById, rooms } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completa tu reserva con tarjeta o Google Pay.",
};

type CheckoutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  await requireAuth("/checkout");

  const params = searchParams ? await searchParams : {};
  const roomIdRaw = params.roomId;
  const checkInRaw = params.checkIn;
  const checkOutRaw = params.checkOut;

  const roomId = Array.isArray(roomIdRaw) ? roomIdRaw[0] : roomIdRaw;
  const checkIn = Array.isArray(checkInRaw) ? checkInRaw[0] : checkInRaw;
  const checkOut = Array.isArray(checkOutRaw) ? checkOutRaw[0] : checkOutRaw;

  const room = (roomId && getRoomById(roomId)) || rooms[0];
  const nights =
    checkIn && checkOut ? calculateStayNights(checkIn, checkOut) : 3;

  const cleaningFee = 45;
  const serviceFeeRate = 0.12;
  const totals = calculateBookingTotal({
    nightlyPrice: room.nightlyPrice,
    nights,
    cleaningFee,
    serviceFeeRate,
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <CheckoutForm
        roomTitle={room.title}
        nightlyPrice={room.nightlyPrice}
        nights={nights}
        cleaningFee={cleaningFee}
        serviceFee={totals.serviceFee}
        total={totals.total}
      />
    </main>
  );
}
