"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { registerSchema } from "@/lib/auth/validators";

type FieldErrors = Partial<Record<"name" | "email" | "password", string>>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/profile";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError("");

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        setApiError(body.error ?? "No se pudo crear la cuenta.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setApiError("Sin conexion. Revisa internet e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="register-name"
        label="Nombre completo"
        autoComplete="name"
        placeholder="Maria Gonzalez"
        value={name}
        onChange={setName}
        error={errors.name}
      />

      <FormField
        id="register-email"
        label="Correo"
        type="email"
        autoComplete="email"
        placeholder="tu@email.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />

      <FormField
        id="register-password"
        label="Contrasena"
        type="password"
        autoComplete="new-password"
        placeholder="Minimo 8 caracteres"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />

      {apiError ? <p className="text-sm text-red-600">{apiError}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
    </form>
  );
}
