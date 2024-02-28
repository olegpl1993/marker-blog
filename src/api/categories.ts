import { WORDPRESS_BASE_URL } from "../constants/urls";
import { CategoryType } from "../types/category.types";

export const fetchCategories = async () => {
  const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/categories`);
  const json: CategoryType[] = await res.json();
  return json;
};
