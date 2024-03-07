import { WORDPRESS_BASE_URL } from "../constants/urls";
import { PostType } from "../types/post.types";

export const fetchPostsByCategory = async (
  category: number,
  queryValue: string | null
) => {
  try {
    const postsRes = await fetch(
      `${WORDPRESS_BASE_URL}wp-json/wp/v2/posts?categories=${category}&search=${
        queryValue || ""
      }`
    );

    if (!postsRes.ok) throw new Error("Failed to fetch posts");
    const posts: PostType[] = await postsRes.json();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
