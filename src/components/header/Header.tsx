import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:py-5">
        <Link href="/blog" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 shadow-lg shadow-sky-500/40" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.18em] text-sky-300 uppercase">
              IdeaBlog
            </span>
            <span className="text-sm text-slate-300">
              Insights for modern builders
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <Link
            href="/blog"
            className="transition-colors hover:text-white/90"
          >
            Blog
          </Link>
          <a
            href="https://ideausher.com/blog/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white/90"
          >
            Inspiration
          </a>
        </nav>

        <Link
          href="/blog"
          className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 md:px-4 md:text-sm"
        >
          View articles
        </Link>
      </div>
    </header>
  );
}

