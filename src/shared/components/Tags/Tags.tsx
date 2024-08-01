import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { memo, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TagContext } from "../../../app/providers/TagProvider";
import styles from "./Tags.module.css";

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tags = memo((props: Props) => {
  const { setIsOpen } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tagsSearchParams = searchParams.get("tags");
  const tags = useContext(TagContext);

  const handleClick = (tag: string) => {
    const isOnBlogPage = /^\/blog(?:\/.*)?$/.test(window.location.pathname);
    const targetUrl = isOnBlogPage ? null : `/blog?tags=${tag}`;

    if (isOnBlogPage) setSearchParams({ tags: tag });
    if (targetUrl) navigate(targetUrl);
    if (setIsOpen) setIsOpen(false);
  };

  if (!tags) return null;
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li className={styles.row} key={tag.id}>
          {tag.slug === tagsSearchParams && (
            <KeyboardDoubleArrowRightIcon
              sx={{ color: "var(--primary-color)", fontSize: "16px" }}
            />
          )}
          <span className={styles.item} onClick={() => handleClick(tag.slug)}>
            {tag.name}
          </span>
          {tag.slug === tagsSearchParams && (
            <KeyboardDoubleArrowLeftIcon
              sx={{ color: "var(--primary-color)", fontSize: "16px" }}
            />
          )}
        </li>
      ))}
    </ul>
  );
});

export default Tags;
