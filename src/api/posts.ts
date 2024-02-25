import { PostType } from "../types/post.types";

export const fetchPosts = async () => {
  const res = await fetch("http://marker.cx.ua/wp-json/wp/v2/posts");
  const json: PostType[] = await res.json();
  return json;
};