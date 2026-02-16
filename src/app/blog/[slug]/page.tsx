import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchBlogBySlug } from "@/lib/blog-api";
import Link from "next/link";
import Image from "next/image";

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await fetchBlogBySlug(params.slug);

  if (!post) {
    return {
      title: "Article not found",
    };
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
  const post = await fetchBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pb-20 md:pt-10">
      <div className="mb-6 text-xs font-medium uppercase tracking-[0.26em] text-slate-400">
        <Link href="/blog" className="text-sky-300 hover:text-sky-200">
          Blog
        </Link>{" "}
        / <span className="text-slate-500">Case study</span>
      </div>

      <article className="overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 shadow-[0_32px_90px_rgba(15,23,42,0.95)]">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800" />
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-75"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <span className="rounded-full bg-sky-500/90 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-sky-500/70">
                {post.source}
              </span>
              <time
                dateTime={post.publishedAt}
                className="rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-slate-200"
              >
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl lg:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="px-6 pb-8 pt-6 text-sm leading-relaxed text-slate-200 md:px-10 md:pb-10 md:pt-8 md:text-base">
          <div className="mb-6 rounded-2xl bg-slate-900/70 p-4 text-xs text-slate-300 md:text-sm">
            <p>
              This article is sourced from{" "}
              <span className="font-semibold text-sky-200">{post.source}</span>.
              Below is a concise summary. For full details, you can open the
              original article in a new tab.
            </p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none text-[0.95rem] leading-relaxed">
            <p>{post.summary}</p>
            <p>
              Because this is powered by a public demo API, we only have access
              to the summary and metadata—not the full editorial content. In a
              real production setup, this page would render your rich text
              content, SEO blocks, and custom components.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-sky-200"
            >
              ← Back to all articles
            </Link>

            <a
              href={post.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-sky-500/60 transition hover:bg-sky-400"
            >
              Read full story on {post.source} ↗
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

