import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-api";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 shadow-[0_18px_45px_rgba(15,23,42,0.85)] transition duration-300 hover:-translate-y-1.5 hover:border-sky-500/60 hover:shadow-[0_24px_65px_rgba(8,47,73,0.95)]">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">{post.title}</span>
      </Link>

      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800" />
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-slate-200">
          <span className="rounded-full bg-sky-500/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/70">
            {post.source}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <time
          dateTime={post.publishedAt}
          className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400"
        >
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
        <h2 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight text-slate-50 group-hover:text-sky-300 md:text-xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
          {post.summary}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>~ 4 min read</span>
          <span className="inline-flex items-center gap-1 text-sky-300">
            Read article
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

