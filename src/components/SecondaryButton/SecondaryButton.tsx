import { FC, ReactNode } from "react";
import styles from "./SecondaryButton.module.css";

interface Props {
  title: string;
  onClick: () => void;
  icon?: ReactNode;
}

const SecondaryButton: FC<Props> = ({ title, onClick, icon }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
};

export default SecondaryButton;
