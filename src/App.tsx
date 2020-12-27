import React, {useEffect, useState} from 'react';
import './App.css';
import {WordBubble, WordBubbleElement} from "./component/WordBubble";
import {FilterTool} from "./component/FilterTool";
import {Category, getNews, NewsApiParams, NewsEntry} from "./news/getNews";
import {WordPanel} from "./component/WordPanel";
const keyword_extractor = require('keyword-extractor');


type WordCloudElementReference = Record<string, NewsEntry[]>
type WordCloudState = {
  words: WordBubbleElement[];
  references: WordCloudElementReference;
};

function extractKeywords(phrase: string): string[] {
  return keyword_extractor.extract(phrase, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  })
}

function countWordFrequency(
  entries: (NewsEntry & {keywords: string[]})[]
): Omit<WordCloudState, 'words'> & {counter: Record<string, number>} {
  const counter: Record<string, number> = {};
  const references: WordCloudElementReference = {};
  for (const entry of entries) {
    const {keywords} = entry;
    for (const word of keywords) {
      if (word in counter) {
        counter[word]++;
        references[word].push(entry);
      }
      else {
        counter[word] = 1;
        references[word] = [entry];
      }
    }
  }
  return {counter, references};
}

function sortWordCounter(counter: Record<string, number>): WordBubbleElement[] {
  return Object.entries(counter)
    .sort((x, y) => x[1] - y[1])
    .map(([text, value]) => {
      return {text, value};
    });
}

function loadWordBubble(
  setCloudState: (cloudState: WordCloudState) => void,
  params?: NewsApiParams) {
  getNews(params).then(x => {
    const keywords: (NewsEntry & {keywords: string[]})[] = x.map(entry => {
      return {...entry, keywords: extractKeywords(entry.title)}
    }).flat(1);
    const {counter, references} = countWordFrequency(keywords);
    setCloudState({words: sortWordCounter(counter), references});
  }).catch(e => {
    console.log("News cannot be retrieved, Error: " + e);
  });
}

function App() {
  document.title = "News Cloud";
  const [cloudState, setCloudState] = useState<WordCloudState>({words: [], references: {}});
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number>(20);
  const [wordPanelProperties, setWordPanelProperties] = useState<{
    isVisible: boolean;
    content: NewsEntry[];
    keyword: string;
  }>({isVisible: false, content: [], keyword: ""});

  useEffect(() => {
    loadWordBubble(setCloudState, {category, q: query, pageSize});
  },[category, pageSize, query]);

  return (
    <div className="App">
      <div className="App-header">
        <FilterTool
          onCategoryChange={category => setCategory(category !== 'any' ? category : undefined)}
          onPageCountChange={count => setPageSize(count)}
          onQueryChange={q => setQuery(q)}
        />
        <div style={{marginTop: '1rem'}}>
          <WordBubble
            words={cloudState.words}
            onWordSelect={word => {
              setWordPanelProperties({
                isVisible: true,
                keyword: word,
                content: cloudState.references[word]
              })
            }}
          />
          <WordPanel
            isVisible={wordPanelProperties.isVisible}
            content={wordPanelProperties.content}
            keyword={wordPanelProperties.keyword}
            onClose={() => setWordPanelProperties({
              isVisible: false,
              keyword: "",
              content: []
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
