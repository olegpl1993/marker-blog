import { CategoryType } from "../../../types/category.types";

export const fetchCategories = async () => {
  const res = await fetch("http://marker.cx.ua/wp-json/wp/v2/categories");
  const json: CategoryType[] = await res.json();
  return json;
};
