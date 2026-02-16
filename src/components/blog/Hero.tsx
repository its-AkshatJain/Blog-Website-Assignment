export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/10 bg-gradient-to-br from-sky-950 via-slate-950 to-slate-950 px-4 py-8 shadow-[0_32px_90px_rgba(8,47,73,0.85)] sm:px-6 sm:py-10 md:px-10 md:py-14">
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            curated insights
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
            Fresh product, design, and{" "}
            <span className="bg-gradient-to-tr from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              engineering stories
            </span>
            .
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            Explore practical guides, architecture deep dives, and case studies
            to help you design and ship better digital products—without the fluff.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Updated weekly
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/70 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Product • Apps • AI
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-sky-500/20 bg-slate-950/60 p-3 text-xs text-slate-200 sm:p-4 md:max-w-xs">
          <p className="font-semibold text-slate-50">
            Why this feels like a studio blog
          </p>
          <p className="text-slate-300">
            Layout, grid, and card treatments are inspired by agency blogs like{" "}
            <span className="font-medium text-sky-200">Idea Usher</span>, but
            implemented with fully server-rendered Next.js 14 components.
          </p>
          <p className="text-slate-400">
            Clean architecture, reusable building blocks, and fast server data
            fetching make it easy to extend this into a full editorial system.
          </p>
        </div>
      </div>
    </section>
  );
}

