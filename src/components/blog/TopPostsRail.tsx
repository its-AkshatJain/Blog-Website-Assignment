import Link from "next/link";
import type { BlogPost } from "@/lib/blog-api";

interface TopPostsRailProps {
  posts: BlogPost[];
}

export default function TopPostsRail({ posts }: TopPostsRailProps) {
  if (!posts.length) return null;

  return (
    <aside className="relative rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 px-5 py-6 shadow-[0_16px_45px_rgba(15,23,42,0.9)]">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
        Top picks
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        Curated articles to get you started quickly.
      </p>

      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-transparent bg-slate-900/40 px-3 py-3 text-sm text-slate-200 transition hover:border-sky-500/60 hover:bg-slate-900"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 flex-none rounded-full bg-sky-500/80 text-center text-xs font-semibold leading-6 text-slate-950 shadow-md shadow-sky-500/70">
                {new Date(post.publishedAt).getDate().toString().padStart(2, "0")}
              </div>
              <div>
                <p className="line-clamp-2 font-medium text-slate-50 group-hover:text-sky-200">
                  {post.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                  {post.summary}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

