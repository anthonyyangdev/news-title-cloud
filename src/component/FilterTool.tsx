import React from "react";
import {Category, categoryValues} from "../news/getNews";
import './FilterTool.css';

function generateNumericalList(start: number, end: number) {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(<option key={i} value={i}>{i}</option>)
  }
  return items;
}

function generateCategoryList() {
  const items = [];
  for (const category of categoryValues) {
    items.push(<option key={category} value={category}>{category}</option>);
  }
  return items;
}

export function FilterTool({onQueryChange, onPageCountChange, onCategoryChange}: {
  onQueryChange: (q: string) => void;
  onPageCountChange: (count: number) => void;
  onCategoryChange: (category: Category | 'any') => void;
}) {
  return (
    <form>
      <label className="form-option">Query: <input type="text" name="q"
                                                   onChange={event => onQueryChange(event.target.value)} />
      </label>
      <label className="form-option">Number of News Articles: <select name="pageCount" defaultValue={'20'}
          onChange={event => onPageCountChange(Number.parseInt(event.target.value))}>
          {generateNumericalList(1, 100)}
        </select>
      </label>
      <label className="form-option">Category: <select name="category" defaultValue='any'
                onChange={event => onCategoryChange(event.target.value as Category | 'any')}>
          {generateCategoryList()}
      </select></label>
    </form>
  )
}
