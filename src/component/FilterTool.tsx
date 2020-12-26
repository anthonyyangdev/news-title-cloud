import React from "react";
import {Category} from "../news/getNews";

export function FilterTool({onQueryChange, onPageCountChange, onCategoryChange}: {
  onQueryChange: (q: string) => void;
  onPageCountChange: (count: number) => void;
  onCategoryChange: (category: Category | 'any') => void;
}) {
  return (
    <form>
      <label>Number of News Articles:
        <input type="number" name="pageCount" min={1} max={100} defaultValue={20} onChange={event => {
          onPageCountChange(Number.parseInt(event.target.value));
        }}/>
      </label>
      <br/>
      <label>Query: <input type="text" name="q" onChange={event => onQueryChange(event.target.value)} /></label>
      <br/>
      <label>Category: <select name="category" defaultValue='any'
                               onChange={event => onCategoryChange(event.target.value as Category | 'any')}>
        <option value="any"> Any </option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="general">General</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select></label>
    </form>
  )
}
