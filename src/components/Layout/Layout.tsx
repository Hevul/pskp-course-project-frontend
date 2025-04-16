import { FC, ReactNode, useState, useEffect, useRef } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevChildrenRef = useRef<ReactNode>(null);

  useEffect(() => {
    if (children !== prevChildrenRef.current) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        prevChildrenRef.current = children;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [children]);

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Navbar />
      </div>

      <div
        className={`${styles.main} ${
          isTransitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default Layout;
