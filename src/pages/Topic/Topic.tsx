import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { PostType } from "../../types/post.types";
import styles from "./Topic.module.css";
import { fetchMediaLink, fetchPostById } from "./Topic.utils";

function Topic() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!post?.featured_media) return;
    const getImageLink = async () => {
      setImage(await fetchMediaLink(post.featured_media));
    };
    getImageLink();
  }, [post, post?.featured_media]);

  useEffect(() => {
    if (!id) return;
    const getPost = async () => {
      setPost(await fetchPostById(id));
    };
    getPost();
  }, [id]);

  if (!post)
    return (
      <div className={styles.spinnerBox}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.topic}>
      <div className={styles.title}>{post?.title.rendered}</div>
      <div className={styles.imageBox}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={post?.title.rendered}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.content}>{post?.content.rendered}</div>
    </div>
  );
}

export default Topic;
