import { fetchBlogPage, fetchTopPosts } from "@/lib/blog-api";
import Hero from "@/components/blog/Hero";
import BlogGrid from "@/components/blog/BlogGrid";
import TopPostsRail from "@/components/blog/TopPostsRail";
import Pagination from "@/components/shared/Pagination";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const PAGE_SIZE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);

  const [{ posts, total }, topPosts] = await Promise.all([
    fetchBlogPage(currentPage, PAGE_SIZE),
    fetchTopPosts(5),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pb-20 md:pt-10">
      <Hero />

      <section className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              All stories
            </h2>
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-medium text-slate-200">
                {posts.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-200">{total}</span> posts
            </p>
          </div>

          <BlogGrid posts={posts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>

        <TopPostsRail posts={topPosts} />
      </section>
    </main>
  );
}

