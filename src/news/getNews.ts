import {Config} from "./Config";

export type NewsApiParams = {
  pageSize?: number;
  category?: string;
  q?: string;
};

export type NewsEntry = {
  title: string;
  source: {
    id: string | null,
    name: string;
  };
  url: string;
  urlToImage: string | undefined;
  publishedAt: string;
  author: string;
  description: string;
  content: string;
}


const debugNewsEntries: NewsEntry[] = [{
  source: {
    id: null,
    name: "Activistpost.com"
  },
  author: "Activist Post",
  title: "How Science & Facts Became “Fake News” In The COVID-19 BioSecurity State – w/ Spiro",
  description: "By The Last American Vagabond Joining Ryan Cristián today on this week’s Rokfin exclusive, is the recently censored Spiro, here to discuss the rise of...\nHow Science & Facts Became “Fake News” In The COVID-19 BioSecurity State – w/ Spiro",
  url: "https://www.activistpost.com/2020/12/how-science-facts-became-fake-news-in-the-covid-19-biosecurity-state-w-spiro.html",
  urlToImage: "https://www.activistpost.com/wp-content/uploads/2020/12/covid-tlav-spiro.jpg",
  publishedAt: "2020-12-27T01:07:20Z",
  content: "By The Last American Vagabond\r\nJoining Ryan Cristián today on this weeks Rokfin exclusive, is the recently censored Spiro, here to discuss the rise of technocratic censorship in the age of COVID-19, … [+1537 chars]"
}, {
  source: {
    id: null,
    name: "newsBTC"
  },
  author: "Nick Chong",
  title: "Rapid Bitcoin Move Could Find a Top Near $28,000: Analyst",
  description: "Bitcoin has undergone an extremely strong rally over the past day, despite the coin facing a strong dip into Christmas. Per CoinGecko, the coin is up 8% in the past 24 hours alone, pushing from the $24,500 region to $26,700 now. At the peak a number of hours …",
  url: "https://www.newsbtc.com/analysis/btc/rapid-bitcoin-move-could-find-a-top-near-28000-analyst/",
  urlToImage: "https://www.newsbtc.com/wp-content/uploads/2020/08/tim-marshall-bh75y-7eYVo-unsplash-scaled.jpg",
  publishedAt: "2020-12-27T01:00:34Z",
  content: "Bitcoin has undergone an extremely strong rally over the past day, despite the coin facing a strong dip into Christmas. Per CoinGecko, the coin is up 8% in the past 24 hours alone, pushing from the $… [+2028 chars]"
}, {
  source: {
    "id": null,
    "name": "CoinDesk"
  },
  "author": "Kevin Reynolds",
  "title": "Fed’s Powell Wins Forbes’ Crypto Person of the Year Honors; Do They Give Awards for Snark?",
  "description": "A side effect of the Fed's medicine for the pandemic-stricken U.S. economy was to create conditions ideal for the rise of cryptocurrencies.",
  "url": "https://www.coindesk.com/feds-powell-wins-forbes-crypto-person-of-the-year-honors-do-they-give-awards-for-snark",
  "urlToImage": "https://static.coindesk.com/wp-content/uploads/2019/06/Powell_Testimony_2018_42753534974-1024x628.jpg",
  "publishedAt": "2020-12-27T00:48:22Z",
  "content": "U.S. Federal Reserve Chairman Jerome Powell is the winner of Forbes’ inaugural “Person of the Year in Crypto” award, an honor for which the central bank chairman is unlikely to make room on his mante… [+849 chars]"
}, {
  source: {
    "id": "the-times-of-india",
    "name": "The Times of India"
  },
  "author": "Economic Times",
  "title": "Latest News LIVE: Bitcoin value surges past $26,000 to set all-time record high",
  "description": "On Binance, the largest cryptocurrency exchange by trading volume, Bitcoin was trading at USD 26,286.74, as of 20:45 GMT on Saturday.",
  "url": "https://economictimes.indiatimes.com/news/newsblogs/latest-news-and-live-updates-december-27/liveblog/79973210.cms",
  "urlToImage": "https://img.etimg.com/thumb/msid-79973210,width-600,resizemode-4,imglength-80497/news/newsblogs/latest-news-and-live-updates-december-27.jpg",
  "publishedAt": "2020-12-27T00:48:20Z",
  "content": "On Binance, the largest cryptocurrency exchange by trading volume, Bitcoin was trading at USD 26,286.74, as of 20:45 GMT on Saturday."
}, {
  source: {
    "id": null,
    "name": "Cointelegraph"
  },
  "author": "Cointelegraph By Andrew Thurman",
  "title": "‘Blow-off top’ or $30,000? Traders muse Bitcoin’s end-of-year fate",
  "description": "What's next for Bitcoin — $30,000 or a 'blow-off top?' Traders and analysts chime in",
  "url": "https://cointelegraph.com/news/blow-off-top-or-30-000-traders-muse-bitcoin-s-end-of-year-fate",
  "urlToImage": "https://s3.cointelegraph.com/uploads/2020-12/a09838d7-cfd0-4ad6-b327-43e1f39963b8.jpg",
  "publishedAt": "2020-12-26T23:40:07Z",
  "content": "After a historic day in which the headlines could hardly keep up with price action and Bitcoin set a new all-time high above $26,500, traders and analysts are now turning their attention towards what… [+2533 chars]"
}];

export async function getNews(params?: NewsApiParams): Promise<{
  news: NewsEntry[];
  lastUpdated: number;
}> {
  let ret: {
    news: NewsEntry[];
    lastUpdated: number;
  };
  if (Config.isProduction) {
    console.log(params)
    const response = await fetch(Config.api + "/news", {
      body: params !== undefined ? JSON.stringify({params}) : '{}',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
    });
    const json = await response.json();
    if (json != null) {
      ret = json;
    } else {
      ret = {
        news: [],
        lastUpdated: -1
      };
    }
  } else {
    ret = {
      news: debugNewsEntries,
      lastUpdated: 10000000
    };
  }
  return ret;
}
