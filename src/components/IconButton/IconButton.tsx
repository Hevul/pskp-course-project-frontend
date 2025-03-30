import { FC, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

const IconButton: FC<Props> = ({ icon, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {icon}
    </div>
  );
};

export default IconButton;
