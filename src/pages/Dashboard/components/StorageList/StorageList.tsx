import StorageButton from "../StorageButton/StorageButton";
import styles from "./StorageList.module.css";
import { useStorage } from "../../../../contexts/StorageContext";

const StorageList = ({}) => {
  const { storages } = useStorage();

  return (
    <div className={styles.storages}>
      {storages.map((s) => (
        <StorageButton key={s.id} id={s.id} name={s.name} />
      ))}
    </div>
  );
};

export default StorageList;
