import { WORDPRESS_BASE_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostById = async (id: string) => {
  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const json: PostType = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
