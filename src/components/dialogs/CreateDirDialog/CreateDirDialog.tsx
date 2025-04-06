import { FC, useEffect, useState } from "react";
import Input from "../../Input/Input";
import styles from "./CreateDirDialog.module.css";
import Button from "../../Button/Button";
import { useDialog } from "../../../contexts/DialogContext";
import useAxios from "../../../hooks/useAxios";
import { create } from "../../../api/dirs";
import { useStorage } from "../../../contexts/StorageContext";
import DialogShell from "../DialogShell";
import InputValidationError from "../../InputValidationError/InputValidationError";
import Dir from "../../../models/Dir";
import { usePopup } from "../../../contexts/PopupContext";
import TickSquareIcon from "../../icons/TickSquareIcon";

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

  const { sendRequest } = useAxios({
    onSuccess(response) {
      if (response?.status === 200) {
        show(
          `Папка ${name} успешно создана!`,
          <TickSquareIcon color="#3EE657" />
        );
        close();
        onSuccess?.();
      }
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setErrorMsg(errorObj.msg);
      }
    },
  });

  const handleCreate = async () => {
    if (!storage) return;
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
        <Button title="Создать" onClick={handleCreate} />
      </div>
    </DialogShell>
  );
};

export default CreateDirDialog;
