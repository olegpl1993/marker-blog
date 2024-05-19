import { Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./PaginationBlog.module.css";

interface Props {
  totalPages: number;
}

const PaginationBlog = memo((props: Props) => {
  const { totalPages } = props;
  const [searchInput, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchInput.get("page")) || 1);

  useEffect(() => {
    setPage(Number(searchInput.get("page")) || 1);
  }, [searchInput]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: String(value) });
  };

  return (
    <div className={styles.paginationBlog}>
      <Pagination
        count={totalPages}
        siblingCount={0}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
});

export default PaginationBlog;
