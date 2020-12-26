import ReactWordcloud, {Callbacks, Options} from "react-wordcloud";
import React from "react";


export type WordBubbleElement = { text: string; value: number; };
const options: Partial<Options> = {
  rotations: 2,
  rotationAngles: [-90, 0] as [number, number]
};
const callbacks: Callbacks = {
  // getWordColor: (word: WordBubbleElement) => word.value > 50 ? "blue" : "red",
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: (word: WordBubbleElement) => `${word.text}`,
}

export function WordBubble({words}: {words: WordBubbleElement[]}) {
  return (
    <ReactWordcloud
      words={words}
      size={[600, 400]}
      options={options}
      callbacks={callbacks}
    />
  )

}
