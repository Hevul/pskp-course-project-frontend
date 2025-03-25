import { FC, ReactNode } from "react";
import styles from "./DialogShell.module.css";

interface Props {
  title: string;
  children: ReactNode;
}

const DialogShell: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.dialog}>
      <h1 className={styles.h1}>{title}</h1>
      {children}
    </div>
  );
};

export default DialogShell;
