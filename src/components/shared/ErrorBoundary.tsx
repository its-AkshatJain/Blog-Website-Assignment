"use client";

import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-8">
        <h2 className="mb-2 text-2xl font-semibold text-red-300">
          Something went wrong
        </h2>
        <p className="mb-6 text-sm text-slate-300">
          We encountered an error while loading this content. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/60 transition hover:bg-sky-400"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
