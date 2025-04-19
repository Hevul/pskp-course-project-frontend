import { FC, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props {
  icon: ReactNode;
  onClick: () => void;
  hasBorder?: boolean;
}

const IconButton: FC<Props> = ({ icon, onClick, hasBorder = true }) => {
  return (
    <div
      className={`${styles.button} ${!hasBorder ? styles.noBorder : ""}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default IconButton;
