"use client";

import Link from "next/link";
import Image from "next/image";
import { ImageOff, ArrowUpRight, Calendar } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog-api";

interface BlogCardProps {
  post: BlogPost;
}

// Consistent date formatting to avoid hydration mismatch
const formatDate = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export default function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700/40 dark:border-slate-700/40 bg-linear-to-br from-white to-slate-50 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950 shadow-lg hover:shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 hover:dark:shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 dark:hover:border-sky-500/60">
      <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">{post.title}</span>
      </Link>

      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
        {post.imageUrl && !imageError ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover opacity-75 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
            priority={false}
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
            <ImageOff className="h-12 w-12 text-slate-400 dark:text-slate-600 opacity-60" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 dark:from-slate-950 via-slate-950/40 dark:via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-xs text-slate-200 dark:text-slate-200 overflow-hidden">
          <span className="rounded-full bg-linear-to-r from-sky-500 to-cyan-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-slate-950 shadow-lg shadow-sky-500/50 shrink-0">
            {post.source.slice(0, 12)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <time dateTime={post.publishedAt}>
            {formatDate(new Date(post.publishedAt))}
          </time>
        </div>
        
        <h2 className="mt-1 line-clamp-2 text-base font-bold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors md:text-lg">
          {post.title}
        </h2>
        
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
          {post.summary}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700/40">
          <span className="text-xs text-slate-700 dark:text-slate-500 font-medium">~3 min read</span>
          <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
            <span className="text-xs font-semibold">Read</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

