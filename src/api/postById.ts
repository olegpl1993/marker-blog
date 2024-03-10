import { WORDPRESS_BASE_API_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostById = async (id: string) => {
  try {
    const url = new URL(`posts/${id}`, WORDPRESS_BASE_API_URL);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const json: PostType = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};
