import { CategoryType } from "../../types/category.types";
import { PostType } from "../../types/post.types";

export const fetchDataByCategory = async (category: string) => {
  const res = await fetch("http://marker.cx.ua/wp-json/wp/v2/categories");
  const json: CategoryType[] = await res.json();
  const categoryID = json.find((item) => item.name === category)?.id;
  const postsRes = await fetch(
    `http://marker.cx.ua/wp-json/wp/v2/posts?categories=${categoryID}`
  );
  const posts: PostType[] = await postsRes.json();
  return posts;
};

export const fetchData = async () => {
  const res = await fetch("http://marker.cx.ua/wp-json/wp/v2/posts");
  const json: PostType[] = await res.json();
  return json;
};
