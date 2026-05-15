export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 h-8 w-64 animate-pulse rounded bg-zinc-200" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="h-40 w-full animate-pulse rounded-xl bg-zinc-200" />
            <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-zinc-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
