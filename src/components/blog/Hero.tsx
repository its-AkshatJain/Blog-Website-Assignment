import { Sparkles, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/20 dark:border-sky-500/20 bg-linear-to-br from-white via-blue-50 to-slate-50 dark:from-sky-950/40 dark:via-slate-950 dark:to-slate-950 px-4 py-8 shadow-2xl shadow-sky-500/10 sm:px-6 sm:py-10 md:px-10 md:py-14 transition-colors duration-300">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

      <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 w-fit">
            <Sparkles className="h-4 w-4 text-sky-500 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              Curated Insights
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
            Discover Fresh{" "}
            <span className="bg-linear-to-r from-sky-500 via-cyan-400 to-emerald-400 dark:from-sky-400 dark:via-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Engineering Stories
            </span>
          </h1>
          
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Explore practical guides, architecture deep dives, and case studies from industry leaders. Stay updated with the latest in product design, engineering, and technology trends.
          </p>
          
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Updated Weekly
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600/60 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <Zap className="h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400" />
              Product • AI • Design
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-sky-500/20 dark:border-sky-500/20 bg-linear-to-br from-blue-50 to-slate-100 dark:from-slate-900/80 dark:to-slate-950/60 backdrop-blur-sm p-4 sm:p-5 text-xs text-slate-600 dark:text-slate-300 md:max-w-xs transition-colors duration-300">
          <p className="font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400" />
            Why This Site?
          </p>
          <p className="text-slate-700 dark:text-slate-400 leading-relaxed">
            Experience a modern, fully responsive blog built with Next.js 14+ and server-side rendering for optimal performance and SEO.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-[11px] italic">
            Clean architecture • Reusable components • Fast data fetching
          </p>
        </div>
      </div>
    </section>
  );
}

