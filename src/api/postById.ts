import { WORDPRESS_BASE_URL } from "../constants/urls";

export const fetchPostById = async (id: string) => {
  const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/posts/${id}`);
  return await res.json();
};
