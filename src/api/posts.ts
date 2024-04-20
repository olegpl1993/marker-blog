import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPosts = async (
  categoryIds?: number[] | number | undefined,
  tagsIds?: number[] | number | undefined,
  search?: string | null | undefined,
  page?: string | null | undefined,
  perPage?: number | null | undefined,
  excludeIds?: number[] | number | undefined
) => {
  try {
    const url = new URL("posts", WORDPRESS_BASE_API_URL);
    if (categoryIds) url.searchParams.append("categories", String(categoryIds));
    if (tagsIds) url.searchParams.append("tags", String(tagsIds));
    if (search) url.searchParams.append("search", search);
    if (page) url.searchParams.append("page", page);
    if (perPage) url.searchParams.append("per_page", String(perPage));
    if (excludeIds) url.searchParams.append("exclude", String(excludeIds));

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts: PostType[] = await res.json();
    return { data: posts, headers: res.headers };
  } catch (error) {
    console.error(error);
    return { data: [], headers: new Headers() };
  }
};
