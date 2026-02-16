import { QueryClient } from "@tanstack/react-query";

const API_BASE = "https://api.spaceflightnewsapi.net/v4/articles";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  publishedAt: string;
  source: string;
  originalUrl: string;
}

interface SpaceflightListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    slug: string;
    title: string;
    summary: string;
    image_url: string | null;
    url: string;
    news_site: string;
    published_at: string;
  }>;
}

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T | null> {
  const res = await fetch(input, {
    next: { revalidate: 300 },
    ...init,
    headers: {
      ...(init?.headers || {}),
    },
  });

  if (res.status === 404) {
    return null; 
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function mapPost(item: SpaceflightListResponse["results"][number]): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: item.image_url,
    publishedAt: item.published_at,
    source: item.news_site,
    originalUrl: item.url,
  };
}

// --- Raw fetchers (no TanStack) ---

async function fetchBlogPageRaw(page: number, pageSize: number) {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const url = `${API_BASE}?limit=${limit}&offset=${offset}&ordering=-published_at`;
  const data = await fetchJson<SpaceflightListResponse>(url);

  return {
    total: data?.count || 0,
    posts: data?.results.map(mapPost) || [],
  };
}

async function fetchBlogByIdRaw(id: number): Promise<BlogPost | null> {
  const url = `${API_BASE}/${id}/`;
  const data = await fetchJson<SpaceflightListResponse["results"][number]>(url);

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    imageUrl: data.image_url,
    publishedAt: data.published_at,
    source: data.news_site,
    originalUrl: data.url,
  };
}

async function fetchTopPostsRaw(limit = 5): Promise<BlogPost[]> {
  const url = `${API_BASE}?limit=${limit}&ordering=-published_at`;
  const data = await fetchJson<SpaceflightListResponse>(url);
  return data?.results.map(mapPost) || [];
}

// --- TanStack Query-powered server helpers ---

function createQueryClient() {
  return new QueryClient();
}

export async function fetchBlogPage(page: number, pageSize: number) {
  const queryClient = createQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["blog-page", page, pageSize],
    queryFn: () => fetchBlogPageRaw(page, pageSize),
  });
}

export async function fetchBlogById(id: number): Promise<BlogPost | null> {
  const queryClient = createQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["blog-detail", id],
    queryFn: () => fetchBlogByIdRaw(id),
  });
}

export async function fetchTopPosts(limit = 5): Promise<BlogPost[]> {
  const queryClient = createQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["top-posts", limit],
    queryFn: () => fetchTopPostsRaw(limit),
  });
}
