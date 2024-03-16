import { CategoryType } from "../types/category.types";

export const createCategoriesString = (
  categories: CategoryType[],
  categoriesIds: number[]
) => {
  return categories
    .filter((category) => categoriesIds.includes(category.id))
    .map((category) => category.name)
    .join(", ");
};
