import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPosts = async (
  categoryID?: number | undefined,
  tagsID?: number | undefined,
  search?: string | null | undefined,
  page?: string | null | undefined
) => {
  try {
    const url = new URL("posts", WORDPRESS_BASE_API_URL);
    if (categoryID) url.searchParams.append("categories", String(categoryID));
    if (tagsID) url.searchParams.append("tags", String(tagsID));
    if (search) url.searchParams.append("search", search);
    if (page) url.searchParams.append("page", page);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts: PostType[] = await res.json();
    return { data: posts, headers: res.headers };
  } catch (error) {
    console.error(error);
    return { data: [], headers: new Headers() };
  }
};
