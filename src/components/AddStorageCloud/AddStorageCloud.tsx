import { useEffect, useState } from "react";
import { create } from "../../api/storages";
import Button from "../Button/Button";
import CloudShell from "../CloudShell/CloudShell";
import PlusIcon from "../icons/PlusIcon";
import InputValidationError from "../InputValidationError/InputValidationError";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import styles from "./AddStorageCloud.module.css";
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";

const AddStorageCloud = () => {
  const [storageName, setStorageName] = useState("");

  const { response, sendRequest, error } = useAxios();
  const { refresh } = useStorage();

  let createError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    const errorObj = errors.find((err: any) => err.path === "name");
    if (errorObj) createError = errorObj.msg;
  }

  useEffect(() => {
    if (response?.status === 201) {
      refresh();
      setStorageName("");
    }
  }, [response]);

  return (
    <CloudShell header="Создание хранилища">
      <div className={styles.inputDiv}>
        <InputWithLabel
          label="Название:"
          placeholder="Название хранилища"
          value={storageName}
          setValue={setStorageName}
          hasError={createError !== null}
        />
        <InputValidationError error={createError} />
      </div>
      <div className={styles.right}>
        <Button
          title="Создать"
          onClick={() => sendRequest(create(storageName))}
          icon={<PlusIcon />}
        />
      </div>
    </CloudShell>
  );
};

export default AddStorageCloud;
