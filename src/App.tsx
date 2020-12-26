import React, {useEffect, useState} from 'react';
import './App.css';
import {getNews} from "./news/getNews";
import ReactWordcloud from 'react-wordcloud';
import {WordBubble} from "./component/WordBubble";
import {FilterTool} from "./component/FilterTool";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FilterTool/>
        <WordBubble/>
      </header>
    </div>
  );
}

export default App;
