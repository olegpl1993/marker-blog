import { Post } from "../types";
import { CategoryType } from "./Category/types";

export const fetchDataByCategory = async (category: string) => {
  const categoriesRes = await fetch(
    "http://marker.cx.ua/wp-json/wp/v2/categories"
  );
  const categories: CategoryType[] = await categoriesRes.json();
  const categoryID = categories.find((item) => item.name === category)?.id;
  const postsRes = await fetch(
    `http://marker.cx.ua/wp-json/wp/v2/posts?categories=${categoryID}`
  );
  const posts: Post[] = await postsRes.json();
  return posts;
};

export const fetchData = async () => {
  const postsRes = await fetch("http://marker.cx.ua/wp-json/wp/v2/posts");
  const posts: Post[] = await postsRes.json();
  return posts;
};