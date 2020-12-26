import ReactWordcloud, {Callbacks, Options} from "react-wordcloud";
import React from "react";


export type WordBubbleElement = { text: string; value: number; };
const options: Partial<Options> = {
  rotations: 2,
  rotationAngles: [0, 0],
  enableTooltip: false,
  fontSizes: [20, 100],
  transitionDuration: 0,
  deterministic: true
};

export function WordBubble({words, onWordSelect}: {
  words: WordBubbleElement[];
  onWordSelect: (word: string) => void;
}) {
  const callbacks: Callbacks = {
    onWordClick: word => {
      return onWordSelect(word.text);
    },
    onWordMouseOver: console.log,
    getWordTooltip: (word: WordBubbleElement) => `${word.text}`,
  }
  return (
    <ReactWordcloud
      words={words}
      size={[800, 600]}
      options={options}
      callbacks={callbacks}
    />
  )

}
