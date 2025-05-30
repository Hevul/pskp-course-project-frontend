import { FC, useEffect, useState } from "react";
import Input from "../../Input/Input";
import styles from "./CreateDirDialog.module.css";
import Button from "../../Button/Button";
import { useDialog } from "../../../contexts/DialogContext";
import useAxios from "../../../hooks/useAxios";
import { create } from "../../../api/dir";
import { useStorage } from "../../../contexts/StorageContext";
import DialogShell from "../DialogShell";
import InputValidationError from "../../InputValidationError/InputValidationError";
import Dir from "../../../models/Dir";
import { usePopup } from "../../../contexts/PopupContext";

interface Props {
  currentDir: Dir | null;
  onSuccess?: () => void;
}

const CreateDirDialog: FC<Props> = ({ currentDir, onSuccess }) => {
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { close } = useDialog();
  const { storage } = useStorage();
  const { show } = usePopup();

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      if (response?.status === 200) {
        show(`Папка ${name} успешно создана!`, { iconType: "success" });
        close();
        onSuccess?.();
      }
    },
    onError(error) {
      show("Не удалось создать папку!", { iconType: "error" });

      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setErrorMsg(errorObj.msg);
      }
    },
  });

  const handleCreate = async () => {
    if (!storage) {
      show("Необходимо выбрать хранилище!", { iconType: "error" });
      setErrorMsg("Необходимо выбрать хранилище!");
      return;
    }

    setErrorMsg(null);
    sendRequest(create(name, storage.id, currentDir?.id));
  };

  return (
    <DialogShell title="Укажите название папки" onEnterDown={handleCreate}>
      <div>
        <Input
          placeholder={"Название папки"}
          value={name}
          setValue={setName}
          hasError={errorMsg !== null}
        />
        <InputValidationError error={errorMsg} />
      </div>

      <div className={styles.buttons}>
        <Button title="Создать" onClick={handleCreate} loading={loading} />
      </div>
    </DialogShell>
  );
};

export default CreateDirDialog;
