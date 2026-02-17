import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900 shadow-lg transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:py-5">
        <Link href="/blog" className="flex items-center gap-2 min-w-0 group">
          <div className="h-7 w-7 sm:h-8 sm:w-8 flex-none rounded-full bg-linear-to-tr from-sky-500 via-cyan-400 to-emerald-400 shadow-lg shadow-sky-500/40 flex items-center justify-center group-hover:shadow-sky-500/60 transition-all">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-slate-950" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-600 dark:text-sky-300 uppercase truncate">
              Blog
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Fresh insights
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 sm:gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link
            href="/blog"
            className="transition-colors hover:text-sky-600 relative group text-slate-600 dark:text-slate-400"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

