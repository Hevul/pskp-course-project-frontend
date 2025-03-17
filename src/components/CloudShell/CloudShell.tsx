import { FC, ReactNode } from "react";
import styles from "./CloudShell.module.css";

interface Props {
  header: string;
  children?: ReactNode;
}

const CloudShell: FC<Props> = ({ header, children }) => {
  return (
    <div className={styles.cloud}>
      <h1 className={styles.h1}>{header}</h1>
      {children}
    </div>
  );
};

export default CloudShell;
