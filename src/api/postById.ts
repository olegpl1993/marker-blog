import { WORDPRESS_BASE_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostById = async (id: string) => {
  const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/posts/${id}`);
  const json: PostType = await res.json();
  return json;
};
