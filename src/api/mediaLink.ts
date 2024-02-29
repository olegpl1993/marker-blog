import { WORDPRESS_BASE_URL } from "../constants/urls";

export const fetchMediaLink = async (id: number) => {
  const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/media/${id}`);
  const json = await res.json();
  return json;
};
