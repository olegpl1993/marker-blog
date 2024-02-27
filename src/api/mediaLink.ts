import { URL_WP } from "../utils/constants";

export const fetchMediaLink = async (id: number) => {
  const res = await fetch(`${URL_WP}wp-json/wp/v2/media/${id}`);
  const json = await res.json();
  return json;
};
