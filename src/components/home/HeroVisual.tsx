export function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/30 via-brand-violet/20 to-brand-cyan/20 blur-2xl" />
      <div className="relative h-full rounded-3xl border border-white/10 bg-slate-surface/80 p-6 shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs text-slate-400">layout.tsx</span>
        </div>
        <div className="space-y-3">
          <div className="h-8 w-3/4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-violet opacity-90" />
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-5/6 rounded bg-white/10" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-xl border border-white/10 bg-midnight/40" />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-9 flex-1 rounded-lg bg-brand-blue/80" />
            <div className="h-9 w-24 rounded-lg border border-brand-cyan/40" />
          </div>
        </div>
        <svg className="absolute -right-4 -bottom-4 h-24 w-24 text-brand-cyan/30" viewBox="0 0 100 100">
          <path d="M10 90 L50 10 L90 50 L50 90 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
