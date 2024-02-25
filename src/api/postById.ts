export const fetchPostById = async (id: string) => {
  const res = await fetch(`http://marker.cx.ua/wp-json/wp/v2/posts/${id}`);
  return await res.json();
};
