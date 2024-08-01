import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { fetchTags } from "../../shared/api/tags";
import { TagType } from "../../shared/types/tags.types";

export const TagContext = createContext<TagType[] | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TagProvider = (props: Props) => {
  const { children } = props;
  const queryTags = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  });

  return (
    <TagContext.Provider value={queryTags.data}>{children}</TagContext.Provider>
  );
};
