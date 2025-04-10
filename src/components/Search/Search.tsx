import { FC } from "react";
import styles from "./Search.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
}

const Search: FC<Props> = ({ search, setSearch, width }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        style={{ width }}
        type="text"
        className={styles.search}
        placeholder="Поиск"
      />
    </div>
  );
};

export default Search;
