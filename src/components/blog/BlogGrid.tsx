import type { BlogPost } from "@/lib/blog-api";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/60 px-6 py-16 text-center text-sm text-slate-300">
        No articles found. Try again in a moment.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

