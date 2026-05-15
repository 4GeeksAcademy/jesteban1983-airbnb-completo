import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const stylesByVariant: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[#FF385C] text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF385C]",
    secondary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900",
    ghost:
      "bg-white text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${stylesByVariant[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
