import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostBySlug = async (slug: string) => {
  try {
    const url = new URL(`posts?slug=${slug}`, WORDPRESS_BASE_API_URL);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const json: PostType[] = await res.json();
    return json[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
