import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

interface Props {
  categoryId?: number[] | number | undefined;
  tagId?: number[] | number | undefined;
  search?: string | null | undefined;
  page?: number | string | null | undefined;
  perPage?: number | null | undefined;
  excludeId?: number[] | number | undefined;
}

export const fetchPosts = async (props: Props) => {
  const { categoryId, tagId, search, page, perPage, excludeId } = props;
  try {
    const url = new URL("posts", WORDPRESS_BASE_API_URL);
    if (categoryId) url.searchParams.append("categories", String(categoryId));
    if (tagId) url.searchParams.append("tags", String(tagId));
    if (search) url.searchParams.append("search", search);
    if (page) url.searchParams.append("page", String(page));
    if (perPage) url.searchParams.append("per_page", String(perPage));
    if (excludeId) url.searchParams.append("exclude", String(excludeId));

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts: PostType[] = await res.json();
    return { data: posts, headers: res.headers };
  } catch (error) {
    console.error(error);
    return { data: [], headers: new Headers() };
  }
};
