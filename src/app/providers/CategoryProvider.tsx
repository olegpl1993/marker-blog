import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { fetchCategories } from "../../shared/api/categories";
import { CategoryType } from "../../shared/types/category.types";

export const CategoryContext = createContext<CategoryType[] | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const CategoryProvider = (props: Props) => {
  const { children } = props;
  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  return (
    <CategoryContext.Provider value={queryCategories.data}>
      {children}
    </CategoryContext.Provider>
  );
};
