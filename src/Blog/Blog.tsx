import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { Post } from "../types";
import styles from "./Blog.module.css";
import { fetchData, fetchDataByCategory } from "./Blog.utils";
import Card from "./Card/Card";
import Category from "./Category/Category";

function Blog() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setPosts(
        category ? await fetchDataByCategory(category) : await fetchData()
      );
    };
    fetchPost();
  }, [category]);

  if (!posts)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.blog}>
      <Category />
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <Card post={post} />
        </div>
      ))}
    </div>
  );
}

export default Blog;
