import styles from "./Storage.module.css";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Button from "../../components/Button/Button";
import StorageButton from "./components/StorageButton";
import { useStorage } from "../../contexts/StorageContext";
import { useDialog } from "../../contexts/DialogContext";
import CreateStorageDialog from "../../components/dialogs/CreateStorageDialog/CreateStorageDialog";
import EmptyState from "../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../components/icons/EmptyBoxIcon";
import Layout from "../Layout/Layout";

const Storage = () => {
  const { storages, refresh } = useStorage();
  const { open } = useDialog();

  const isEmpty = storages.length === 0;

  const handleCreateStorage = () => {
    open(<CreateStorageDialog onSuccess={refresh} />);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className={styles.main}>
          <div className={styles.top}>
            <h2 className={styles.h2}>Мои хранилища</h2>
            <Button
              title={"Создать новое хранилище"}
              onClick={handleCreateStorage}
            />
          </div>

          {isEmpty ? (
            <div className={styles.emptyDiv}>
              <EmptyState
                message="Нет доступных хранилищ"
                subMessage={
                  <>
                    <span
                      className={styles.clickableText}
                      onClick={handleCreateStorage}
                    >
                      Создайте
                    </span>
                    <span> первое хранилище, чтобы оно появилось здесь</span>
                  </>
                }
                icon={<EmptyBoxIcon />}
              />
            </div>
          ) : (
            <div className={styles.storages}>
              {storages.map((s) => (
                <StorageButton key={s.id} storage={s} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Storage;
