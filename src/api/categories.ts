import { WORDPRESS_BASE_URL } from "../constants/urls";
import { CategoryType } from "../types/category.types";

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json: CategoryType[] = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
