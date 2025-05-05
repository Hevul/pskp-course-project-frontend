import { FC, useState } from "react";
import Input from "../../Input/Input";
import DialogShell from "../DialogShell";
import { useDialog } from "../../../contexts/DialogContext";
import styles from "./RenameStorageDialog.module.css";
import Button from "../../Button/Button";
import useAxios from "../../../hooks/useAxios";
import { rename } from "../../../api/storage";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";
import Storage from "../../../models/Storage";

interface Props {
  storage: Storage;
  onSuccess?: () => void;
}

const RenameStorageDialog: FC<Props> = ({ storage, onSuccess }) => {
  const { name: oldName, id } = storage;

  const [name, setName] = useState(oldName);
  const [renameError, setRenameError] = useState<string | null>(null);

  const { close } = useDialog();
  const { show } = usePopup();

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      if (response?.status === 200) {
        show(`Хранилище ${oldName} переименовано в ${name}!`, {
          iconType: "success",
        });
        close();
        onSuccess?.();
      }
    },
    onError(error) {
      show(`Не удалось переименовать хранилище!`, {
        iconType: "error",
      });

      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setRenameError(errorObj.msg);
      }
    },
  });

  const handleRename = async () => {
    sendRequest(rename(id, name));
  };

  return (
    <DialogShell
      title={`Укажите новое название хранилища`}
      onEnterDown={handleRename}
    >
      <div>
        <Input
          placeholder={`Новое название хранилища`}
          value={name}
          setValue={setName}
          hasError={renameError !== null}
        />
        <InputValidationError error={renameError} />
      </div>

      <div className={styles.buttons}>
        <Button
          title="Переименовать"
          onClick={handleRename}
          loading={loading}
        />
      </div>
    </DialogShell>
  );
};

export default RenameStorageDialog;
