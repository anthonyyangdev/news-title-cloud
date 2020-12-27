import {NewsEntry} from "../news/getNews";
import React, {CSSProperties} from "react";

const wordPanelStyle: CSSProperties = {
  position: "fixed",
  height: "100%",
  width: "60%",
  top: 0, left: "20%", right: "20%", bottom: 0,
  backgroundColor: "rgba(256,256,256,0.75)",
  color: "black",
  display: "none",
  textAlign: "left",
  overflow: "scroll",
  padding: "1rem",
  zIndex: 2
};

export function WordPanel({isVisible, content, onClose}: {
  isVisible: boolean;
  content: NewsEntry[];
  onClose: () => void;
}) {
  return (
    <div style={{
      ...wordPanelStyle,
      display: isVisible ? "block" : "none"
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
