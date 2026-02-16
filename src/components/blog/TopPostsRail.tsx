import Link from "next/link";
import { Star, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog-api";

interface TopPostsRailProps {
  posts: BlogPost[];
}

// Consistent date formatting to avoid hydration mismatch
const formatShortDate = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
};

export default function TopPostsRail({ posts }: TopPostsRailProps) {
  if (!posts.length) return null;

  return (
    <aside className="relative rounded-2xl border border-slate-300 dark:border-slate-700/40 bg-linear-to-b from-white to-slate-50 dark:from-slate-900/60 dark:to-slate-950/60 px-4 sm:px-5 py-6 shadow-lg sm:shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 backdrop-blur-sm transition-colors duration-300">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-sky-500/50 to-transparent" />
      
      <div className="flex items-center gap-2 mb-2">
        <Star className="h-5 w-5 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-300">
          Top Picks
        </h2>
      </div>
      
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
        Hand-picked articles to get you started
      </p>

      <div className="space-y-3">
        {posts.map((post, idx) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group block rounded-lg border border-slate-300 dark:border-slate-600/30 bg-slate-100 dark:bg-slate-900/40 px-3 py-3 text-xs text-slate-700 dark:text-slate-300 transition-all hover:border-sky-400 dark:hover:border-sky-500/60 hover:bg-slate-200 dark:hover:bg-linear-to-r dark:hover:from-sky-950/40 dark:hover:to-slate-900/40"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex-none rounded-full bg-linear-to-tr from-sky-500 to-cyan-400 text-center text-[11px] font-bold leading-6 text-white dark:text-slate-950 shadow-md shadow-sky-500/40 shrink-0">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-50 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {post.title}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-600 dark:text-slate-500">
                  <Calendar className="h-3 w-3" />
                  {formatShortDate(new Date(post.publishedAt))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

