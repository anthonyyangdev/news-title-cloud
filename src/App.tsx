import React, {useEffect, useState} from 'react';
import './App.css';
import {WordBubble, WordBubbleElement} from "./component/WordBubble";
import {FilterTool} from "./component/FilterTool";
import {Category, getNews, NewsApiParams, NewsEntry} from "./news/getNews";
import {WordPanel} from "./component/WordPanel";
import {LastUpdatedMessage} from "./component/LastUpdatedMessage";
const keyword_extractor = require('keyword-extractor');


type WordCloudElementReference = Record<string, NewsEntry[]>
type WordCloudState = {
  words: WordBubbleElement[];
  references: WordCloudElementReference;
  lastUpdated: number;
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
): Omit<WordCloudState, 'words' | 'lastUpdated'> & {counter: Record<string, number>} {
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
    const keywords: (NewsEntry & {keywords: string[]})[] = x.news.map(entry => {
      return {...entry, keywords: extractKeywords(entry.title)}
    }).flat(1);
    const {counter, references} = countWordFrequency(keywords);
    setCloudState({
      words: sortWordCounter(counter),
      references,
      lastUpdated: x.lastUpdated
    });
  }).catch(e => {
    console.log("News cannot be retrieved, Error: " + e);
  });
}

function App() {
  document.title = "News Cloud";
  const [cloudState, setCloudState] = useState<WordCloudState>({
    words: [],
    references: {},
    lastUpdated: -1,
  });
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number>(20);
  const [windowSize, setWindowSize] = useState<{width: number; height: number}>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [wordPanelProperties, setWordPanelProperties] = useState<{
    isVisible: boolean;
    content: NewsEntry[];
    keyword: string;
  }>({isVisible: false, content: [], keyword: ""});

  useEffect(() => {
    loadWordBubble(setCloudState, {category, q: query, pageSize});
  },[category, pageSize, query]);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }, []);

  console.log(cloudState.lastUpdated)
  return (
    <div className="App">
      <header className="App-header">
        News Cloud
      </header>
      <div className="App-body">
        <FilterTool
          onCategoryChange={category => setCategory(category !== 'any' ? category : undefined)}
          onPageCountChange={count => setPageSize(count)}
          onQueryChange={q => setQuery(q)}
        />
        <div style={{marginTop: '1rem'}}>
          <LastUpdatedMessage lastUpdatedInit={cloudState.lastUpdated}/>
          <WordBubble
            words={cloudState.words}
            windowSize={windowSize}
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
            onClose={() => setWordPanelProperties({isVisible: false, keyword: "", content: []})}
          />
        </div>
      </div>
      <footer className="App-footer">
        <p>By Anthony Yang <a href="https://github.com/anthonyyangdev" target="_blank" rel="noreferrer">@anthonyyangdev</a></p>
        <p><a href="https://google.com" target="_blank" rel="noreferrer">Github Repo</a></p>
      </footer>
    </div>
  );
}

export default App;
