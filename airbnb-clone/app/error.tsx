"use client";

import { Button } from "@/components/atoms/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#FF385C]">
        Algo fallo
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
        Modo simplificado activado
      </h1>
      <p className="mt-3 max-w-xl text-zinc-600">
        Ocurrio un error inesperado. Puedes recargar para intentar recuperar la experiencia completa.
      </p>

      <div className="mt-6">
        <Button onClick={reset}>Reintentar</Button>
      </div>

      <p className="mt-4 text-xs text-zinc-400">Referencia: {error.digest ?? "N/A"}</p>
    </main>
  );
}
