import { useEntities } from "../../contexts/EntitiesContext";
import { useStorage } from "../../contexts/StorageContext";
import RightIcon from "../icons/RightIcon";
import styles from "./Path.module.css";

const Path = () => {
  const { path, currentDir, setCurrentDir } = useEntities();
  const { storage } = useStorage();

  return (
    <div className={styles.container}>
      <button
        className={currentDir ? styles.hoveredButton : styles.defButton}
        onClick={() => setCurrentDir(null)}
      >
        <h1 className={styles.path}>{storage?.name}</h1>
      </button>

      {path.map((d) => (
        <div key={d.id} className={styles.item}>
          <RightIcon width="12" height="15" color="#3A3A49" />
          <button
            className={
              d.id === currentDir?.id ? styles.defButton : styles.hoveredButton
            }
            onClick={() => setCurrentDir(d)}
          >
            <h1 className={styles.path} key={d.id}>
              {d.name}
            </h1>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Path;
