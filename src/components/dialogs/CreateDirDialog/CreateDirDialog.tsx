import { SetStateAction, useEffect, useState } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import styles from "./CreateDirDialog.module.css";
import Button from "../../Button/Button";
import { useDialog } from "../../../contexts/DialogContext";
import useAxios from "../../../hooks/useAxios";
import { create } from "../../../api/dirs";
import { useStorage } from "../../../contexts/StorageContext";
import { useEntities } from "../../../contexts/EntitiesContext";
import DialogShell from "../DialogShell";
import PlusIcon from "../../icons/PlusIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import InputValidationError from "../../InputValidationError/InputValidationError";

const CreateDirDialog = () => {
  const [name, setName] = useState("");

  const { response, error, sendRequest } = useAxios();
  const { close } = useDialog();
  const { storage } = useStorage();
  const { refresh, currentDir } = useEntities();

  const handleCreate = async () => {
    if (!storage) return;
    sendRequest(create(name, storage.id, currentDir?.id));
  };

  useEffect(() => {
    if (response?.status === 200) {
      close();
      refresh();
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
    <DialogShell title="Создание папки">
      <div>
        <InputWithLabel
          label="Название папки:"
          placeholder={""}
          value={name}
          setValue={setName}
        />
        <InputValidationError error={createError} />
      </div>

      <div className={styles.buttons}>
        <SecondaryButton title="Отмена" onClick={close} />
        <Button
          title="Создать"
          onClick={handleCreate}
          icon={<PlusIcon width="18" color="white" />}
        />
      </div>
    </DialogShell>
  );
};

export default CreateDirDialog;
