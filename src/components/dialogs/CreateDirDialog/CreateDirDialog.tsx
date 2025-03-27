import { FC, useEffect, useState } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import styles from "./CreateDirDialog.module.css";
import Button from "../../Button/Button";
import { useDialog } from "../../../contexts/DialogContext";
import useAxios from "../../../hooks/useAxios";
import { create } from "../../../api/dirs";
import { useStorage } from "../../../contexts/StorageContext";
import DialogShell from "../DialogShell";
import InputValidationError from "../../InputValidationError/InputValidationError";
import Dir from "../../../models/Dir";

interface Props {
  currentDir: Dir | null;
  onSuccess?: () => void;
}

const CreateDirDialog: FC<Props> = ({ currentDir, onSuccess }) => {
  const [name, setName] = useState("");

  const { response, error, sendRequest } = useAxios();
  const { close } = useDialog();
  const { storage } = useStorage();

  const handleCreate = async () => {
    if (!storage) return;
    sendRequest(create(name, storage.id, currentDir?.id));
  };

  useEffect(() => {
    if (response?.status === 200) {
      close();
      onSuccess?.();
    }
  }, [response]);

  let createError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      const errorObj = errors[0];
      if (errorObj) createError = errorObj.msg;
    }
  }

  return (
    <DialogShell title="Укажите название папки" onEnterDown={handleCreate}>
      <div>
        <InputWithLabel
          placeholder={"Название папки"}
          value={name}
          setValue={setName}
          hasError={createError !== null}
        />
        <InputValidationError error={createError} />
      </div>

      <div className={styles.buttons}>
        <Button title="Создать" onClick={handleCreate} />
      </div>
    </DialogShell>
  );
};

export default CreateDirDialog;
