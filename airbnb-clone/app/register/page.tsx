import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/organisms/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Registro",
  description: "Crea una cuenta para reservar y pagar de forma segura.",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12 sm:py-20">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Crear cuenta</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Tu sesion se guarda en una cookie segura para proteger el acceso.
        </p>

        <div className="mt-6">
          <RegisterForm />
        </div>

        <p className="mt-5 text-sm text-zinc-600">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-[#FF385C] hover:underline">
            Inicia sesion
          </Link>
        </p>
      </div>
    </main>
  );
}
