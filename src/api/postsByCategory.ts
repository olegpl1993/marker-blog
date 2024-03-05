import { WORDPRESS_BASE_URL } from "../constants/urls";
import { CategoryType } from "../types/category.types";
import { PostType } from "../types/post.types";

export const fetchPostsByCategory = async (category: string) => {
  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json: CategoryType[] = await res.json();
    const categoryID = json.find((item) => item.slug === category)?.id;
    if (!categoryID) throw new Error("Failed to find category ID");
    const postsRes = await fetch(
      `${WORDPRESS_BASE_URL}wp-json/wp/v2/posts?categories=${categoryID}`
    );
    if (!postsRes.ok) throw new Error("Failed to fetch posts");
    const posts: PostType[] = await postsRes.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};
