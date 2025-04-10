import styles from "./Storage.module.css";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Layout from "../../components/Layout/Layout";
import Search from "../../components/Search/Search";
import { SetStateAction } from "react";
import Button from "../../components/Button/Button";
import OptionsIcon from "../../components/icons/OptionsIcon";

const Storage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className={styles.main}>
          <h1 className={styles.h1}>Панель управления</h1>

          <div className={styles.storagesPanel}>
            <div className={styles.top}>
              <h2 className={styles.h2}>Хранилища</h2>
              <Button
                title={"Создать новое хранилище"}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>

            <div className={styles.storages}>
              <div className={styles.storage}>
                <div className={styles.options}>
                  <OptionsIcon color="rgba(65, 64, 75, 0.6)" />
                </div>
                <h1 className={styles.storageName}>Storage 2</h1>
              </div>
            </div>
          </div>

          <div className={styles.savedLinksPanel}>
            <div className={styles.top}>
              <h2 className={styles.h2}>Сохранённые ссылки</h2>
              <Search
                width="500px"
                search={""}
                setSearch={function (value: SetStateAction<string>): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>

          <div className={styles.myLinksPanel}>
            <div className={styles.top}>
              <h2 className={styles.h2}>Мои ссылки</h2>
              <Search
                width="500px"
                search={""}
                setSearch={function (value: SetStateAction<string>): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Storage;
