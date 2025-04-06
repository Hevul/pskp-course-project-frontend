import { FC, useState } from "react";
import Input from "../../Input/Input";
import styles from "./CreateStorageDialog.module.css";
import Button from "../../Button/Button";
import { useDialog } from "../../../contexts/DialogContext";
import useAxios from "../../../hooks/useAxios";
import { create } from "../../../api/storages";
import DialogShell from "../DialogShell";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";

interface Props {
  onSuccess?: () => void;
}

const CreateStorageDialog: FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { close } = useDialog();
  const { show } = usePopup();

  const { sendRequest } = useAxios({
    onSuccess(response) {
      if (response?.status === 201) {
        show(`Хранилище ${name} успешно создано!`, { iconType: "success" });
        close();
        onSuccess?.();
      }
    },
    onError(error) {
      show("Не удалось создать хранилище!", { iconType: "error" });

      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setErrorMsg(errorObj.msg);
      }
    },
  });

  const handleCreate = async () => {
    setErrorMsg(null);
    sendRequest(create(name));
  };

  return (
    <DialogShell title="Укажите название хранилища" onEnterDown={handleCreate}>
      <div>
        <Input
          placeholder={"Название хранилища"}
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

export default CreateStorageDialog;
