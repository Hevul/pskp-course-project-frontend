import { useEffect, useState } from "react";
import CloudShell from "../CloudShell/CloudShell";
import Input from "../Input/Input";
import styles from "./RenameStorageCloud.module.css";
import useAxios from "../../hooks/useAxios";
import Button from "../Button/Button";
import EditIcon from "../icons/EditIcon";
import { useStorage } from "../../contexts/StorageContext";
import { rename } from "../../api/storages";
import InputValidationError from "../InputValidationError/InputValidationError";

const RenameStorageCloud = () => {
  const [storageName, setStorageName] = useState("");

  const { storage, selectStorage, refresh } = useStorage();
  const { response, sendRequest, error } = useAxios();

  let renameError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    const errorObj = errors.find(
      (err: any) => err.path === "name" || err.path === "id"
    );
    if (errorObj) renameError = errorObj.msg;
  }

  useEffect(() => {
    if (response?.status === 200) {
      selectStorage({
        id: storage!.id,
        name: storageName,
      });
      refresh();
      setStorageName("");
    }
  }, [response]);

  return (
    <CloudShell header="Переименование хранилища">
      <div className={styles.inputDiv}>
        <Input
          label="Новое название:"
          placeholder="Название хранилища"
          value={storageName}
          setValue={setStorageName}
          hasError={renameError !== null}
        />
        <InputValidationError error={renameError} />
      </div>
      <div className={styles.right}>
        <Button
          title="Изменить"
          onClick={() =>
            sendRequest(rename(storage ? storage.id : "", storageName))
          }
          icon={<EditIcon width="13" height="13" />}
        />
      </div>
    </CloudShell>
  );
};

export default RenameStorageCloud;
