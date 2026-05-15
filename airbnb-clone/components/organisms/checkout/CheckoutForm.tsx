"use client";

import { useState } from "react";

import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import {
  type CheckoutInput,
  checkoutSchema,
} from "@/lib/auth/validators";

type CheckoutFormProps = {
  roomTitle: string;
  nightlyPrice: number;
  nights: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
};

type CheckoutFieldErrors = Partial<
  Record<"guestName" | "cardNumber" | "expiryDate" | "cvc", string>
>;

export function CheckoutForm({
  roomTitle,
  nightlyPrice,
  nights,
  cleaningFee,
  serviceFee,
  total,
}: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<CheckoutInput["paymentMethod"]>(
    "card",
  );
  const [guestName, setGuestName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function handlePay() {
    setStatusMessage("");
    // Una sola validación central controla tarjeta y Google Pay según el método elegido.
    const parsed = checkoutSchema.safeParse({
      paymentMethod,
      guestName,
      cardNumber: cardNumber.replace(/\s+/g, ""),
      expiryDate,
      cvc,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        guestName: fieldErrors.guestName?.[0],
        cardNumber: fieldErrors.cardNumber?.[0],
        expiryDate: fieldErrors.expiryDate?.[0],
        cvc: fieldErrors.cvc?.[0],
      });
      return;
    }

    setErrors({});
    setStatusMessage(
      "Pago simulado exitoso. En produccion aqui se dispara la confirmacion con Stripe.",
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Confirmar y pagar</h2>
        <p className="mt-1 text-sm text-zinc-600">Alojamiento: {roomTitle}</p>

        <div className="mt-5 space-y-4">
          <div className="flex gap-2 rounded-xl bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                paymentMethod === "card"
                  ? "bg-white text-zinc-900 shadow"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Tarjeta
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("googlePay")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                paymentMethod === "googlePay"
                  ? "bg-white text-zinc-900 shadow"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Google Pay
            </button>
          </div>

          <FormField
            id="guest-name"
            label="Titular de la reserva"
            value={guestName}
            onChange={setGuestName}
            placeholder="Nombre completo"
            error={errors.guestName}
          />

          {paymentMethod === "card" ? (
            <>
              <FormField
                id="card-number"
                label="Numero de tarjeta"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(value) => setCardNumber(formatCardNumber(value))}
                error={errors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  id="card-expiry"
                  label="Expira"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={setExpiryDate}
                  error={errors.expiryDate}
                />
                <FormField
                  id="card-cvc"
                  label="CVC"
                  placeholder="123"
                  value={cvc}
                  onChange={setCvc}
                  error={errors.cvc}
                />
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              Usa Google Pay para completar el pago en un solo paso.
            </div>
          )}

          <Button type="button" className="w-full" onClick={handlePay}>
            Pagar ${total.toFixed(2)}
          </Button>

          {statusMessage ? (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-lg font-semibold text-zinc-900">Detalle de precio</h3>
        <div className="mt-4 space-y-2 text-sm text-zinc-700">
          <div className="flex justify-between">
            <span>
              ${nightlyPrice} x {nights} noches
            </span>
            <span>${(nightlyPrice * nights).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tasa de servicio</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Limpieza</span>
            <span>${cleaningFee.toFixed(2)}</span>
          </div>
          <hr className="my-2 border-zinc-200" />
          <div className="flex justify-between text-base font-semibold text-zinc-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
