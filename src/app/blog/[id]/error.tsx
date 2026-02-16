"use client";

import Link from "next/link";
import { useEffect } from "react";

interface BlogDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogDetailError({
  error,
  reset,
}: BlogDetailErrorProps) {
  useEffect(() => {
    console.error("Blog detail error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pb-20 md:pt-10">
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-xs font-medium uppercase tracking-[0.26em] text-sky-300 hover:text-sky-200"
        >
          ← Back to Blog
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-red-500/30 bg-red-950/20 p-8 text-center">
        <h1 className="mb-3 text-2xl font-bold text-red-300 md:text-3xl">
          Error Loading Article
        </h1>
        <p className="mb-2 text-slate-300">
          We couldn&apos;t load the article you&apos;re looking for.
        </p>
        <p className="mb-6 text-sm text-slate-400">
          {error?.message || "The article may have been removed or moved."}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/60 transition hover:bg-sky-400"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-6 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-500/60 hover:bg-slate-900"
          >
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
