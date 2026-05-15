import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/organisms/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Inicia sesion para continuar con tu reserva.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12 sm:py-20">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Bienvenido de nuevo</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Ingresa para gestionar tus reservas y completar pagos.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>

        <p className="mt-5 text-sm text-zinc-600">
          No tienes cuenta?{" "}
          <Link href="/register" className="font-medium text-[#FF385C] hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </main>
  );
}
