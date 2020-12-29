import {NewsEntry} from "./news/getNews";

export type WordCloudElementReference = Record<string, NewsEntry[]>
export type WordCloudState = {
  words: WordBubbleElement[];
  references: WordCloudElementReference;
  lastUpdated: number;
};
export type WordBubbleElement = { text: string; value: number; };
