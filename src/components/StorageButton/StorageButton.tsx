import { FC } from "react";
import styles from "./StorageButton.module.css";
import { useStorage } from "../../contexts/StorageContext";

interface Props {
  name: string;
  id: string;
  className?: string;
}

const StorageButton: FC<Props> = ({ name, id, className }) => {
  const { storage, selectStorage } = useStorage();

  const isActive = storage?.id === id;

  return (
    <div className={className}>
      <button
        style={{ color: isActive ? "#4676FB" : "#ADC0F8" }}
        className={styles.button}
        onClick={() => selectStorage({ id, name })}
      >
        {name}
      </button>
      {isActive ? <div className={styles.underline}></div> : null}
    </div>
  );
};

export default StorageButton;
