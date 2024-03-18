import { memo, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { TagContext } from "../../contexts/TagProvider";
import styles from "./Tags.module.css";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tags = memo((props: Props) => {
  const { setIsOpen } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const tagsSearchParams = searchParams.get("tags");
  const tags = useContext(TagContext);

  const handleClick = (tag: string) => {
    setSearchParams({ tags: tag });
    setIsOpen && setIsOpen(false);
  };

  if (!tags) return null;
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li
          className={`${styles.item} ${
            tag.slug === tagsSearchParams && styles.active
          }`}
          key={tag.id}
          onClick={() => handleClick(tag.slug)}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
});

export default Tags;
