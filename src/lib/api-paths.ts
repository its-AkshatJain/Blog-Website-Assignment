// Single source of truth for external API base URLs and endpoint builders
export const SPACEFLIGHT_API_BASE = "https://api.spaceflightnewsapi.net/v4";
export const ARTICLES = `${SPACEFLIGHT_API_BASE}/articles`;

export const articlesList = (limit: number, offset = 0) =>
  `${ARTICLES}?limit=${limit}&offset=${offset}&ordering=-published_at`;

export const articleById = (id: number | string) => `${ARTICLES}/${id}/`;

export const topPosts = (limit = 5) => `${ARTICLES}?limit=${limit}&ordering=-published_at`;
