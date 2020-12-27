import {NewsEntry} from "../news/getNews";
import React, {CSSProperties} from "react";

const wordPanelStyle: CSSProperties = {
  position: "fixed",
  height: "90%",
  width: "90%",
  top: "5%", left: "5%",
  borderRadius: "3%",
  borderColor: "#4f4f4f",
  borderStyle: "solid",
  backgroundColor: "rgba(255,255,255,0.95)",
  color: "black",
  textAlign: "left",
  overflow: "scroll",
  zIndex: 2
};

const entryStyle: CSSProperties = {
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#4f4f4f",
  padding: "1rem",
  margin: "1rem",
  borderRadius: "3%"
};

const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function WordPanel({isVisible, content, keyword, onClose}: {
  isVisible: boolean;
  content: NewsEntry[];
  keyword: string;
  onClose: () => void;
}) {
  return (
    <div style={{
      ...wordPanelStyle,
      display: isVisible ? "block" : "none"
    }}>
      <div>
        <button onClick={onClose} style={{
          margin: "1rem",
        }}>Close</button>
        <h1 style={{
          textAlign: "center",
        }}>{keyword}</h1>
      </div>
      {content.map(entry => {
        const publishDate = new Date(Date.parse(entry.publishedAt));
        const month = monthStrings[publishDate.getMonth()];
        const day = publishDate.getDate();
        const year = publishDate.getFullYear();
        const time = publishDate.toLocaleTimeString();
        const publishString = `${month} ${day}, ${year} ${time}`;
        return (
          <div key={entry.url} style={entryStyle}>
            <h2>{entry.source.name}</h2>
            <hr/>
            <div style={{display: "flex"}}>
              <div style={{flex: 4}}>
                <h3><a href={entry.url} target="_blank" rel="noreferrer">{entry.title}</a></h3>
                {/*<h4>{entry.description}</h4>*/}
                <h5>Published: {publishString}</h5>
                <h5>By: {entry.author}</h5>
              </div>
              <div style={{flex: 1, textAlign: "center"}}>
                <img src={entry.urlToImage} alt={entry.urlToImage} style={{
                  width: "80%", margin: "0 auto", verticalAlign: "middle"
                }}/>
              </div>
            </div>
            <hr/>
            <p>{entry.content}</p>
        </div>);
      })}
    </div>
  );
}
