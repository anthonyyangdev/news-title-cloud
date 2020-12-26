import ReactWordcloud from "react-wordcloud";
import React, {useEffect, useState} from "react";
import {getNews} from "../news/getNews";
const keyword_extractor = require('keyword-extractor');

const options = {
  rotations: 2,
  rotationAngles: [-90, 0] as [number, number]
};
const callbacks = {
  getWordColor: (word: {value: number}) => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: (word: {text: string; value: number}) => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}

export function WordBubble() {
  const [words, setWords] = useState<{text: string; value: number;}[]>([]);
  useEffect(() => {
    getNews().then(x => {
      const keywords: string[][] = x.map(t => keyword_extractor.extract(t.title, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
      }));
      const counter: Record<string, number> = {};
      for (const set of keywords) {
        for (const word of set) {
          if (word in counter) counter[word]++;
          else counter[word] = 1;
        }
      }
      return Object.entries(counter)
        .sort((x, y) => x[1] - y[1])
        .map(([text, value]) => {return {text, value};});
    }).then(words => {
      setWords(words);
    }).catch(e => {
      console.log("News cannot be retrieved, Error: " + e);
    });
  }, []);

  return (
    <ReactWordcloud
      words={words}
      size={[600, 400]}
      options={options}
      callbacks={callbacks}
    />
  )

}
