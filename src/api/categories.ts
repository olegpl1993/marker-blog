import { CategoryType } from "../types/category.types";
import { URL_WP } from "../utils/constants";

export const fetchCategories = async () => {
  const res = await fetch(`${URL_WP}wp-json/wp/v2/categories`);
  const json: CategoryType[] = await res.json();
  return json;
};
