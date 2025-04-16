import { FC, ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface Props {
  message: string;
  subMessage?: string;
  icon?: ReactNode;
}

const EmptyState: FC<Props> = ({ message, subMessage, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.message}>{message}</h3>
      {subMessage && <p className={styles.subMessage}>{subMessage}</p>}
    </div>
  );
};

export default EmptyState;
