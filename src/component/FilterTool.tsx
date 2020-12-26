import React from "react";

export function FilterTool() {
  return (
    <form>
      <label>Number of News Articles: <input type="number" name="pageCount" min={1} max={100} value={20}/></label>
      <br/>
      <label>Query: <input type="text" name="q" /></label>
      <br/>
      <label>Category: <select name="category">
        <option selected value="any"> Any </option>
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
