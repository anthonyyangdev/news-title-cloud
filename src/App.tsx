import React, {useEffect, useState} from 'react';
import './App.css';
import {WordBubble, WordBubbleElement} from "./component/WordBubble";
import {FilterTool} from "./component/FilterTool";
import {Category, getNews, NewsApiParams} from "./news/getNews";
const keyword_extractor = require('keyword-extractor');

function extractKeywords(phrase: string): string[] {
  return keyword_extractor.extract(phrase, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  })
}

function countWordFrequency(words: string[]): Record<string, number> {
  const counter: Record<string, number> = {};
  for (const word of words) {
    if (word in counter) counter[word]++;
    else counter[word] = 1;
  }
  return counter;
}

function sortWordCounter(counter: Record<string, number>): WordBubbleElement[] {
  return Object.entries(counter)
    .sort((x, y) => x[1] - y[1])
    .map(([text, value]) => {
      return {text, value};
    });
}

const isProduction = false;
function loadWordBubble(setWords: (words: WordBubbleElement[]) => void, params?: NewsApiParams) {
  if (isProduction) {
    getNews(params).then(x => {
      const keywords: string[] = x.map(t => extractKeywords(t.title)).flat(1);
      const counter = countWordFrequency(keywords);
      setWords(sortWordCounter(counter));
    }).catch(e => {
      console.log("News cannot be retrieved, Error: " + e);
    });
  } else {
    setWords([
      {
        text: 'slams',
        value: 39
      }, {
        text: 'Biden',
        value: 39,
      }, {
        text: 'Trump',
        value: 39
      }
    ])
  }
}

function App() {
  const [words, setWords] = useState<WordBubbleElement[]>([]);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number>(20);

  useEffect(() => loadWordBubble(setWords, {category, q: query, pageSize}),
    [category, pageSize, query]);

  return (
    <div className="App">
      <header className="App-header">
        <FilterTool
          onCategoryChange={category => setCategory(category !== 'any' ? category : undefined)}
          onPageCountChange={count => setPageSize(count)}
          onQueryChange={q => setQuery(q)}
        />
        <div>
          <WordBubble words={words}/>
        </div>
      </header>
    </div>
  );
}

export default App;
