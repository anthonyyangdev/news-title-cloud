import {Config} from "./Config";

export async function getCategories(): Promise<{
  text: string;
  value: string;
}[]> {
  const response = await fetch(Config.api + "/categories");
  if (response.ok) {
    const json = await response.json();
    return json.categories;
  } else {
    return [];
  }
}
