import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createHref = (page: number) =>
    page === 1 ? `${basePath}` : `${basePath}?page=${page}`;

  const pages: number[] = [];
  const maxVisible = 5;
  const halfWindow = Math.floor(maxVisible / 2);
  
  let start = Math.max(1, currentPage - halfWindow);
  const end = Math.min(totalPages, start + maxVisible - 1);
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 sm:mt-10 flex flex-col gap-3 rounded-xl border border-slate-300 dark:border-slate-700/40 bg-linear-to-r from-slate-100 to-slate-200 dark:from-slate-950/60 dark:to-slate-900/60 backdrop-blur px-2 py-3 text-sm text-slate-700 dark:text-slate-200 sm:gap-4 sm:px-3 transition-colors duration-300"
    >
      {/* Mobile: Simplified pagination */}
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <PaginationButton
          href={currentPage > 1 ? createHref(currentPage - 1) : undefined}
          disabled={currentPage <= 1}
          icon="prev"
        >
          Prev
        </PaginationButton>
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {currentPage} / {totalPages}
        </span>
        <PaginationButton
          href={
            currentPage < totalPages ? createHref(currentPage + 1) : undefined
          }
          disabled={currentPage >= totalPages}
          icon="next"
        >
          Next
        </PaginationButton>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <PaginationButton
            href={currentPage > 1 ? createHref(currentPage - 1) : undefined}
            disabled={currentPage <= 1}
            icon="prev"
          >
            Previous
          </PaginationButton>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {start > 1 && (
            <>
              <PaginationPage href={createHref(1)} active={currentPage === 1}>
                1
              </PaginationPage>
              {start > 2 && (
                <span className="px-1 text-xs text-slate-600 dark:text-slate-500">•••</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <PaginationPage
              key={page}
              href={createHref(page)}
              active={page === currentPage}
            >
              {page}
            </PaginationPage>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && (
                <span className="px-1 text-xs text-slate-600 dark:text-slate-500">•••</span>
              )}
              <PaginationPage
                href={createHref(totalPages)}
                active={currentPage === totalPages}
              >
                {totalPages}
              </PaginationPage>
            </>
          )}
        </div>

        <div className="flex flex-1 justify-end">
          <PaginationButton
            href={
              currentPage < totalPages ? createHref(currentPage + 1) : undefined
            }
            disabled={currentPage >= totalPages}
            icon="next"
          >
            Next
          </PaginationButton>
        </div>
      </div>
    </nav>
  );
}

interface PaginationButtonProps {
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: "prev" | "next";
}

function PaginationButton({
  href,
  disabled,
  children,
  icon,
}: PaginationButtonProps) {
  const styles =
    "inline-flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  if (!href || disabled) {
    return (
      <button className={`${styles} text-slate-600 dark:text-slate-500 bg-slate-200 dark:bg-slate-800/20`} disabled>
        {icon === "prev" && <ChevronLeft className="h-4 w-4" />}
        {children}
        {icon === "next" && <ChevronRight className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${styles} border border-slate-400 dark:border-slate-600/40 bg-linear-to-r from-slate-200 to-slate-300 dark:from-slate-800/40 dark:to-slate-900/40 text-sky-700 dark:text-sky-300 hover:border-sky-500 dark:hover:border-sky-500/60 hover:bg-linear-to-r hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-950/60 dark:hover:to-sky-900/40 hover:text-sky-800 dark:hover:text-sky-200 transition-all`}
    >
      {icon === "prev" && <ChevronLeft className="h-4 w-4" />}
      {children}
      {icon === "next" && <ChevronRight className="h-4 w-4" />}
    </Link>
  );
}

interface PaginationPageProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

function PaginationPage({ href, active, children }: PaginationPageProps) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-bold bg-linear-to-br from-sky-500 to-cyan-500 text-white dark:text-slate-950 shadow-lg shadow-sky-500/50 transition-all"
          : "inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-semibold border border-slate-400 dark:border-slate-600/40 text-slate-800 dark:text-slate-300 hover:border-sky-500 dark:hover:border-sky-500/60 hover:bg-slate-200 dark:hover:bg-slate-800/40 hover:text-sky-700 dark:hover:text-sky-300 transition-all"
      }
    >
      {children}
    </Link>
  );
}

