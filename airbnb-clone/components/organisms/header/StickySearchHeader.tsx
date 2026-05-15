"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickySearchHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur transition-all duration-300 ${
        isCompact ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#FF385C]">
          airbnb.clone
        </Link>

        <div
          className={`hidden rounded-full border border-zinc-300 bg-white px-4 shadow-sm transition-all md:flex ${
            isCompact ? "py-2 text-sm" : "py-3 text-base"
          }`}
        >
          <span>Donde</span>
          <span className="mx-3 text-zinc-300">|</span>
          <span>Check-in</span>
          <span className="mx-3 text-zinc-300">|</span>
          <span>Check-out</span>
          <span className="mx-3 text-zinc-300">|</span>
          <span className="text-zinc-500">Huespedes</span>
        </div>

        <nav className="flex items-center gap-2 text-sm">
          <Link href="/login" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
            Login
          </Link>
          <Link href="/register" className="rounded-lg px-3 py-2 hover:bg-zinc-100">
            Registro
          </Link>
        </nav>
      </div>
    </header>
  );
}
