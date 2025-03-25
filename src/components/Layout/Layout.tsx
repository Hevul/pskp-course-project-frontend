import { FC, ReactNode } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Navbar />
      </div>

      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Layout;
