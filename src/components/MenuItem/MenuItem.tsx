import { FC, ReactNode } from "react";
import styles from "./MenuItem.module.css";

interface Props {
  title: string;
  action: () => void;
  icon?: ReactNode;
}

const MenuItem: FC<Props> = ({ title, action, icon }) => {
  return (
    <li className={styles.menuItem} onClick={action}>
      <div className={styles.itemContent}>
        <div className={styles.icon}>{icon}</div>

        {title}
      </div>
    </li>
  );
};

export default MenuItem;
