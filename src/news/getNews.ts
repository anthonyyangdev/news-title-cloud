
const apiKey = "1b071f2ba09342579e83cc9bfc08e82d";

type NewsApiParams = {
  pageSize?: number;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  q?: string;
};

type NewsEntry = {
  title: string;
}

export async function getNews(params?: NewsApiParams): Promise<NewsEntry[]> {
  let url: string;
  if (params !== undefined) {
    const {pageSize, category, q} = params;
    const pageSizeParam = `pageSize=${Math.min(pageSize ?? Infinity, 100)}`;
    const categoryParam = category !== undefined ? `category=${category}` : '';
    const qParam = q !== undefined ?`q=${q}` : '';
    url = `http://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us&${pageSizeParam}&${categoryParam}&${qParam}`;
  } else {
    url = `http://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;
  }
  const req = new Request(url);
  const response = await fetch(req);
  const json = await response.json();
  if (json.status === "ok") {
    return json.articles.map((x: Record<string, string>) => {
      return {
        title: x.title
      };
    });
  } else {
    return [];
  }
}
