import { useEffect } from "react";
import { remove } from "../../api/storages";
import { useStorage } from "../../contexts/StorageContext";
import useAxios from "../../hooks/useAxios";
import Button from "../Button/Button";
import CloudShell from "../CloudShell/CloudShell";
import DeleteIcon from "../icons/DeleteIcon";
import InputValidationError from "../InputValidationError/InputValidationError";
import styles from "./DeleteStorageCloud.module.css";

const DeleteStorageCloud = () => {
  const { storage, selectStorage, refresh } = useStorage();

  const { response, sendRequest, error } = useAxios();

  let deleteError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    const errorObj = errors.find((err: any) => err.path === "id");
    if (errorObj) deleteError = errorObj.msg;
  }

  useEffect(() => {
    if (response?.status === 200) {
      refresh();
      selectStorage(null);
    }
  }, [response]);

  return (
    <CloudShell header="Удаление хранилища">
      <div>
        <p className={styles.p}>
          Вы правда хотите удалить хранилище со всеми файлами?
        </p>
        <InputValidationError error={deleteError} />
      </div>
      <div className={styles.right}>
        <Button
          color="#FF0000"
          title="Удалить"
          onClick={() => sendRequest(remove(storage ? storage.id : "", true))}
          icon={<DeleteIcon width="13" height="13" />}
        />
      </div>
    </CloudShell>
  );
};

export default DeleteStorageCloud;
