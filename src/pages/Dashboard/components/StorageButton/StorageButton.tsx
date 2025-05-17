import { FC } from "react";
import styles from "./StorageButton.module.css";
import { useStorage } from "../../../../contexts/StorageContext";
import { useEntities } from "../../../../contexts/EntitiesContext";

interface Props {
  name: string;
  id: string;
  className?: string;
}

const StorageButton: FC<Props> = ({ name, id, className }) => {
  const { storage, selectStorage } = useStorage();
  const { setCurrentDir } = useEntities();

  const isActive = storage?.id === id;

  const handleClick = () => {
    selectStorage({ id, name });
    setCurrentDir(null);
  };

  return (
    <div className={styles.div}>
      <button
        style={{ color: isActive ? "#4676FB" : "#ADC0F8" }}
        className={styles.button}
        onClick={handleClick}
      >
        {name}
      </button>
      {isActive ? <div className={styles.underline}></div> : null}
    </div>
  );
};

export default StorageButton;
