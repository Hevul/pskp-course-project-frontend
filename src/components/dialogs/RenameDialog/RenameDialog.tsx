import { FC, useEffect, useState } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
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

interface Props {
  entity: Entity;
}

const RenameDialog: FC<Props> = ({ entity }) => {
  const { id, name: oldName } = entity;

  const [name, setName] = useState(oldName);

  const isFile = entity.type === "file";

  const { close } = useDialog();
  const { refresh } = useEntities();
  const { response, sendRequest, error } = useAxios();

  const handleRename = async () => {
    sendRequest(isFile ? renameFile(id, name) : renameDir(id, name));
  };

  useEffect(() => {
    if (response?.status === 200) {
      close();
      refresh();
    }
  }, [response]);

  let renameError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      const errorObj = errors[0];
      if (errorObj) renameError = errorObj.msg;
    }
  }

  return (
    <DialogShell
      title={`Укажите новое название ${isFile ? "файла" : "папки"}`}
      onEnterDown={handleRename}
    >
      <div>
        <InputWithLabel
          placeholder={`Новое название ${isFile ? "файла" : "папки"}`}
          value={name}
          setValue={setName}
          hasError={renameError !== null}
        />
        <InputValidationError error={renameError} />
      </div>

      <div className={styles.buttons}>
        <Button title="Переименовать" onClick={handleRename} />
      </div>
    </DialogShell>
  );
};

export default RenameDialog;
