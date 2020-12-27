import ReactWordcloud, {Callbacks, Options} from "react-wordcloud";
import React from "react";


export type WordBubbleElement = { text: string; value: number; };
const options: Partial<Options> = {
  rotations: 2,
  rotationAngles: [0, 0],
  enableTooltip: false,
  fontSizes: [20, 100],
  deterministic: true,
  colors: []
};

function WordBubbleComponent({words, onWordSelect, windowSize}: {
  words: WordBubbleElement[];
  onWordSelect: (word: string) => void;
  windowSize: {width: number; height: number;};
}) {
  const callbacks: Callbacks = {
    onWordClick: word => {
      return onWordSelect(word.text);
    },
    onWordMouseOver: console.log,
    getWordTooltip: (word: WordBubbleElement) => `${word.text}`,
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size: [number, number] = [width * 0.8, height * 0.8];
  return (
    <ReactWordcloud
      words={words}
      size={size}
      options={options}
      callbacks={callbacks}
    />
  )
}

export const WordBubble = React.memo(WordBubbleComponent,
  (prevProp,
   nextProp) => {
  return (JSON.stringify(prevProp.words) === JSON.stringify(nextProp.words))
    && (prevProp.windowSize.height === nextProp.windowSize.height)
    && (prevProp.windowSize.width === nextProp.windowSize.width);
});
