import { URL_WP } from "../utils/constants";

export const fetchPostById = async (id: string) => {
  const res = await fetch(`${URL_WP}wp-json/wp/v2/posts/${id}`);
  return await res.json();
};
