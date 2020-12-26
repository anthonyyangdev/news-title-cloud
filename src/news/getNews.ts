
const apiKey = "1b071f2ba09342579e83cc9bfc08e82d";

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type NewsApiParams = {
  pageSize?: number;
  category?: Category;
  q?: string;
};

export type NewsEntry = {
  title: string;
  source: {
    id: string | null,
    name: string;
  };
  url: string;
  publishedAt: string;
  author: string;
  description: string;
  content: string;
}

export async function getNews(params?: NewsApiParams): Promise<NewsEntry[]> {
  let url: string;
  if (params !== undefined) {
    const {pageSize, category, q} = params;
    const pageSizeParam = `pageSize=${Math.min(pageSize ?? Infinity, 100)}`;
    const categoryParam = category !== undefined ? `category=${category}` : '';
    const qParam = q !== undefined ?`q=${q}` : '';
    const headerParam = [pageSizeParam, categoryParam, qParam].filter(x => x.length > 0).join("&")
    url = `http://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us&${headerParam}`;
  } else {
    url = `http://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;
  }
  const req = new Request(url);
  const response = await fetch(req);
  const json = await response.json();
  if (json.status === "ok") {
    return json.articles.map((x: Record<string, unknown>) => {
      return {
        title: x.title,
        source: x.source,
        url: x.url,
        publishedAt: x.publishedAt,
        author: x.author != null ? x.author : 'Unknown',
        description: x.description,
        content: x.content
      };
    });
  } else {
    return [];
  }
}
