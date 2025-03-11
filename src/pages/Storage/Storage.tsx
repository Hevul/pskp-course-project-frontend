import styles from "./Storage.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Storage = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}></div>
    </div>
  );
};

export default Storage;
