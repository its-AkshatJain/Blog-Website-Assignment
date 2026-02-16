import Link from "next/link";

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
  let end = Math.min(totalPages, start + maxVisible - 1);
  
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
      className="mt-8 sm:mt-10 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-2 py-3 text-sm text-slate-200 sm:gap-4 sm:px-3"
    >
      {/* Mobile: Simplified pagination */}
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <PaginationButton
          href={currentPage > 1 ? createHref(currentPage - 1) : undefined}
          disabled={currentPage <= 1}
        >
          ← Prev
        </PaginationButton>
        <span className="text-xs text-slate-400">
          {currentPage} / {totalPages}
        </span>
        <PaginationButton
          href={
            currentPage < totalPages ? createHref(currentPage + 1) : undefined
          }
          disabled={currentPage >= totalPages}
        >
          Next →
        </PaginationButton>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <PaginationButton
            href={currentPage > 1 ? createHref(currentPage - 1) : undefined}
            disabled={currentPage <= 1}
          >
            ← Previous
          </PaginationButton>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {start > 1 && (
            <>
              <PaginationPage href={createHref(1)} active={currentPage === 1}>
                1
              </PaginationPage>
              {start > 2 && (
                <span className="px-2 text-xs text-slate-500">•••</span>
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
                <span className="px-2 text-xs text-slate-500">•••</span>
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
          >
            Next →
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
}

function PaginationButton({
  href,
  disabled,
  children,
}: PaginationButtonProps) {
  const styles =
    "inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1.5 text-xs font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";

  if (!href || disabled) {
    return (
      <button className={`${styles} text-slate-500`} disabled>
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${styles} border border-slate-700/80 bg-slate-900/80 text-slate-100 hover:border-sky-500/60 hover:bg-slate-900`}
    >
      {children}
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
      className={[
        "inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-semibold transition",
        active
          ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/60"
          : "border border-transparent text-slate-300 hover:border-sky-500/60 hover:bg-slate-900",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

