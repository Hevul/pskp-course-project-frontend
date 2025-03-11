import { FC } from "react";
import styles from "./Search.module.css";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<Props> = ({ search, setSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.search} placeholder="Поиск" />
      <img className={styles.img} src="Search.svg" alt="" />
    </div>
  );
};

export default Search;
