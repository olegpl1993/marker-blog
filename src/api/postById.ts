import { WORDPRESS_BASE_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostById = async (id: string) => {
  const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/posts/${id}`);
  if (res.status !== 200) throw new Error("Failed to fetch posts");
  const json: PostType = await res.json();
  return json;
};
