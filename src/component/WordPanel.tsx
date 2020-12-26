import {NewsEntry} from "../news/getNews";
import React, {CSSProperties} from "react";

const wordPanelStyle: CSSProperties = {
  position: "fixed",
  left: "70%",
  width: "20%",
  height: "500px",
  backgroundColor: "whitesmoke",
  color: "black",
  display: "none",
  textAlign: "left",
  overflow: "scroll",
  padding: "1rem"
};

export function WordPanel({isVisible, content, onClose}: {
  isVisible: boolean;
  content: NewsEntry[];
  onClose: () => void;
}) {
  return (
    <div style={{
      ...wordPanelStyle,
      display: isVisible ? "initial" : "none"
    }}>
      <button onClick={onClose}>Close</button>
      {content.map(entry => {
        return (<div key={entry.url}>
          <h2>{entry.source.name}</h2>
          <h3>{entry.title}</h3>
          <h4>{entry.description}</h4>
          <h5>By: {entry.author}</h5>
          <p>{entry.content}</p>
        </div>);
      })}
    </div>
  );
}
