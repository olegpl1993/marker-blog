import { CategoryType } from "../types/category.types";
import { PostType } from "../types/post.types";
import { URL_WP } from "../utils/constants";

export const fetchPostsByCategory = async (category: string) => {
  const res = await fetch(`${URL_WP}wp-json/wp/v2/categories`);
  const json: CategoryType[] = await res.json();
  const categoryID = json.find((item) => item.name === category)?.id;
  const postsRes = await fetch(
    `${URL_WP}wp-json/wp/v2/posts?categories=${categoryID}`
  );
  const posts: PostType[] = await postsRes.json();
  return posts;
};
