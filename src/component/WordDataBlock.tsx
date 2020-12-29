import React from 'react';
import {WordCloudState} from "../Types";

type PropTypes = {
  state: WordCloudState;
};

export function WordDataBlock(props: PropTypes) {
  const {words} = props.state;
  const colors = ["#57b2e9", "#679bb5"]
  return <table style={{
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginBottom: "1rem"
  }}>
    <caption><h3>Keyword Frequency</h3></caption>
    <tr>
      <th>Word</th>
      <th>Count</th>
    </tr>
    {words.sort((x, y) => y.value - x.value).map(
      (word, idx) => {
      return <tr key={word.value} style={{
        backgroundColor: colors[idx % 2]
      }}>
        <td>{word.text}</td>
        <td>{word.value}</td>
      </tr>;
    })}
  </table>
}
