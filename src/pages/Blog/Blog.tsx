import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { PostType } from "../../types/post.types";
import styles from "./Blog.module.css";
import { fetchData, fetchDataByCategory } from "./Blog.utils";
import Card from "./Card/Card";
import Category from "./Category/Category";

function Blog() {
  const { category } = useParams();
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setPosts(
        category ? await fetchDataByCategory(category) : await fetchData()
      );
    };
    getPosts();
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
