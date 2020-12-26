import ReactWordcloud, {Callbacks, Options} from "react-wordcloud";
import React from "react";


export type WordBubbleElement = { text: string; value: number; };
const options: Partial<Options> = {
  rotations: 2,
  rotationAngles: [0, 0],
  enableTooltip: false,
  fontSizes: [20, 100]
};
const callbacks: Callbacks = {
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: (word: WordBubbleElement) => `${word.text}`,
}

export function WordBubble({words}: {words: WordBubbleElement[]}) {
  return (
    <ReactWordcloud
      words={words}
      size={[800, 600]}
      options={options}
      callbacks={callbacks}
    />
  )

}
