import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostsByCategoryID = async (
  categoryID: number,
  queryValue: string | null
) => {
  try {
    const url = new URL("posts", WORDPRESS_BASE_API_URL);
    url.searchParams.append("categories", String(categoryID));
    if (queryValue) url.searchParams.append("search", queryValue);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts: PostType[] = await res.json();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
