import { FC, useEffect, useState } from "react";
import Input from "../../Input/Input";
import DialogShell from "../DialogShell";
import { useDialog } from "../../../contexts/DialogContext";
import styles from "./RenameDialog.module.css";
import Button from "../../Button/Button";
import { useEntities } from "../../../contexts/EntitiesContext";
import useAxios from "../../../hooks/useAxios";
import { rename as renameFile } from "../../../api/files";
import { rename as renameDir } from "../../../api/dirs";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { Entity } from "../../../models/Entity";
import { usePopup } from "../../../contexts/PopupContext";

interface Props {
  entity: Entity;
}

const RenameDialog: FC<Props> = ({ entity }) => {
  const { id, name: oldName } = entity;
  const isFile = entity.type === "file";

  const [name, setName] = useState(oldName);
  const [renameError, setRenameError] = useState<string | null>(null);

  const { close } = useDialog();
  const { refresh } = useEntities();
  const { show } = usePopup();

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      if (response?.status === 200) {
        show(
          `${isFile ? "Файл" : "Папка"} ${oldName} переименован${
            isFile ? "" : "а"
          } в ${name}!`,
          { iconType: "success" }
        );
        close();
        refresh();
      }
    },
    onError(error) {
      show(`Не удалось переименовать ${isFile ? "файл" : "папка"}!`, {
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
    sendRequest(isFile ? renameFile(id, name) : renameDir(id, name));
  };

  return (
    <DialogShell
      title={`Укажите новое название ${isFile ? "файла" : "папки"}`}
      onEnterDown={handleRename}
    >
      <div>
        <Input
          placeholder={`Новое название ${isFile ? "файла" : "папки"}`}
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

export default RenameDialog;
