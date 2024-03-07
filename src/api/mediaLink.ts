import { WORDPRESS_BASE_API_URL } from "../constants/urls";

export const fetchMediaLink = async (id: number) => {
  try {
    const url = new URL(`media/${id}`, WORDPRESS_BASE_API_URL);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch media");
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
