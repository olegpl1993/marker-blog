import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { TagType } from "../types/tags.types";

export const fetchTags = async () => {
  try {
    const url = new URL("tags", WORDPRESS_BASE_API_URL);
    url.searchParams.append("per_page", "100");
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tags");
    const json: TagType[] = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};
