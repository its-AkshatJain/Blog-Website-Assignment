import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchBlogById } from "@/lib/blog-api";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, BookMarked } from "lucide-react";
import ImageWithFallback from "@/components/blog/ImageWithFallback";

interface BlogDetailPageProps {
  params: { id: number };
}

export async function generateMetadata(
  props: BlogDetailPageProps
): Promise<Metadata> {
  const { id } = await props.params;

  const post = await fetchBlogById(Number(id));

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: `${post.title} | IdeaBlog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = await fetchBlogById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-3 pb-12 pt-6 sm:px-4 md:px-6 md:pb-20 md:pt-10">
      <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700/40 bg-linear-to-b from-white to-slate-50 dark:from-slate-900/60 dark:via-slate-900/30 dark:to-slate-950 shadow-2xl transition-colors duration-300">
        <div className="relative aspect-video sm:aspect-video lg:aspect-16/7 w-full overflow-hidden bg-linear-to-br from-slate-800 to-slate-900">
          <ImageWithFallback src={post.imageUrl} alt={post.title} title={post.source} />
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 dark:from-slate-950 dark:via-slate-950/50 to-transparent" />

          <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-200 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-cyan-500 px-3 py-1.5 font-bold uppercase tracking-wider text-white dark:text-slate-950 shadow-lg shadow-sky-500/60">
                <BookMarked className="h-3.5 w-3.5" />
                {post.source}
              </span>
              <time
                dateTime={post.publishedAt}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-300/70 dark:bg-slate-950/70 px-3 py-1.5 text-[12px] font-medium text-slate-900 dark:text-slate-300 backdrop-blur-sm"
              >
                <Calendar className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="px-4 pb-6 pt-5 text-xs leading-relaxed text-slate-700 dark:text-slate-200 sm:px-6 sm:pb-8 sm:pt-6 sm:text-sm md:px-10 md:pb-10 md:pt-8 md:text-base space-y-4">
          <div className="rounded-lg border border-sky-500/20 bg-linear-to-r from-sky-100 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-950/30 p-4 text-xs sm:text-sm">
            <p className="text-sky-900 dark:text-slate-300">
              This article is from{" "}
              <span className="font-bold text-sky-700 dark:text-sky-300">{post.source}</span>.
              Below is a summary. For complete details, open the original article.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>{post.summary}</p>
            <p className="text-slate-600 dark:text-slate-400 italic">
              Since this demo uses a public API, we only have access to summaries. In production, you&apos;d render full rich text content with custom components.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 border-t border-slate-300 dark:border-slate-700/40 pt-6 mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-800/60 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>

            <a
              href={post.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-sky-600 to-cyan-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 hover:from-sky-500 hover:to-cyan-500 transition-all"
            >
              Read Full Article
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

