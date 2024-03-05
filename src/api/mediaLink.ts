import { WORDPRESS_BASE_URL } from "../constants/urls";

export const fetchMediaLink = async (id: number) => {
  try {
    const res = await fetch(`${WORDPRESS_BASE_URL}wp-json/wp/v2/media/${id}`);
    if (!res.ok) throw new Error("Failed to fetch media");
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
