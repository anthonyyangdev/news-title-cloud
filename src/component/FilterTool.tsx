import React, {useEffect, useState} from "react";
import './FilterTool.css';
import {getCategories} from "../news/getCategories";

function generateNumericalList(start: number, end: number) {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(<option key={i} value={i}>{i}</option>)
  }
  return items;
}

export function FilterTool({onQueryChange, onPageCountChange, onCategoryChange}: {
  onQueryChange: (q: string) => void;
  onPageCountChange: (count: number) => void;
  onCategoryChange: (category: string) => void;
}) {
  const [categories, setCategories] = useState<{value: string; text: string}[]>([]);
  useEffect(() => {
    getCategories().then(response => {
      setCategories(response);
    });
  }, []);
  return (
    <form>
      <label className="form-option">Query: <input type="text" name="q"
                                                   onChange={event => onQueryChange(event.target.value)} />
      </label>
      <label className="form-option">Number of News Articles: <select name="pageCount" defaultValue={20}
          onChange={event => onPageCountChange(Number.parseInt(event.target.value))}>
          {generateNumericalList(1, 100)}
        </select>
      </label>
      <label className="form-option">Category: <select name="category" defaultValue='any'
                onChange={event => onCategoryChange(event.target.value)}>
          {categories.map(({text, value}) => {
            return <option key={value} value={value}>{text}</option>;
          })}
      </select></label>
    </form>
  )
}
