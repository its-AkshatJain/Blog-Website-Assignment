"use client";

import { useEffect } from "react";

interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service here
    console.error("Blog page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pb-20 md:pt-10">
      <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-red-300">
          Error Loading Blog
        </h1>
        <p className="mb-2 text-slate-300">
          We encountered an issue while loading the blog posts.
        </p>
        <p className="mb-6 text-sm text-slate-400">
          {error?.message || "Please try again in a moment."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/60 transition hover:bg-sky-400"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
