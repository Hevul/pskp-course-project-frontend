import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./Search.module.css";
import SearchIcon from "../icons/SearchIcon";
import CrossIcon from "../icons/CrossIcon";

interface Props {
  onSearch: (query: string) => void;
  width?: string;
  placeholder?: string;
  initialValue?: string;
}

const Search: FC<Props> = ({
  width = "100%",
  placeholder = "Поиск...",
  initialValue = "",
  onSearch,
}) => {
  const [query, setQuery] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={styles.searchContainer} style={{ width }}>
      <div className={styles.searchIcon}>
        <SearchIcon width="24" />
      </div>

      <input
        type="text"
        className={styles.search}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />

      {query && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Очистить поиск"
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
};

export default Search;
