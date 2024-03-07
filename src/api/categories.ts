import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { CategoryType } from "../types/category.types";

export const fetchCategories = async () => {
  try {
    const url = new URL("categories", WORDPRESS_BASE_API_URL);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json: CategoryType[] = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};
