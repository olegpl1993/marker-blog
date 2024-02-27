import { PostType } from "../types/post.types";
import { URL_WP } from "../utils/constants";

export const fetchPosts = async () => {
  const res = await fetch(`${URL_WP}wp-json/wp/v2/posts`);
  const json: PostType[] = await res.json();
  return json;
};