import Search from "../../components/Search/Search";
import styles from "./SavedLinks.module.css";

const SavedLinks = () => {
  return (
    <div className={styles.savedLinksPanel}>
      <div className={styles.top}>
        <h2 className={styles.h2}>Сохранённые ссылки</h2>
        <Search width="500px" search={""} setSearch={() => {}} />
      </div>
    </div>
  );
};

export default SavedLinks;
