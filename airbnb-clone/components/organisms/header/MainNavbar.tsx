import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/detalle", label: "Detalle" },
];

export function MainNavbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#FF385C]">
          airbnb.clone
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-full px-3 py-2 text-sm font-medium hover:bg-zinc-100">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50"
          >
            Registro
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-zinc-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}