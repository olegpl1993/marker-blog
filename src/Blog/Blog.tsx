import { useEffect, useState } from "react";
import { Post } from "../types";
import styles from "./Blog.module.css";
import Card from "./Card/Card";
import Spinner from "./Spinner/Spinner";

function Blog() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("http://marker.cx.ua/wp-json/wp/v2/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  console.log(posts);

  if (!posts) {
    return <Spinner />;
  }

  return (
    <div className={styles.blog}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <Card post={post} />
        </div>
      ))}
    </div>
  );
}

export default Blog;
