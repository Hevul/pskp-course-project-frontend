import styles from "./Storage.module.css";
import Button from "../../components/Button/Button";
import CloudShell from "../../components/CloudShell/CloudShell";
import DeleteIcon from "../../components/icons/DeleteIcon";
import StorageList from "../../components/StorageList/StorageList";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Layout from "../../components/Layout/Layout";

const Storage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className={styles.top}>
          <StorageList />
        </div>
        <div className={styles.center}></div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Storage;
