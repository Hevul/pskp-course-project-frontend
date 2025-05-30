import { FC, useEffect, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./MoveFileConflictDialog.module.css";
import TextField from "../../TextField/TextField";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import { useDialog } from "../../../contexts/DialogContext";
import Button from "../../Button/Button";
import useAxios from "../../../hooks/useAxios";
import { get, move } from "../../../api/file";
import File from "../../../models/File";
import InfoTile from "./InfoTile.module";
import Input from "../../Input/Input";
import { usePopup } from "../../../contexts/PopupContext";
import InputValidationError from "../../InputValidationError/InputValidationError";

interface Props {
  entity: Entity;
  conflictingId: string;
  destinationId?: string;
  onSuccess?: () => void;
}

const MoveFileConflictDialog: FC<Props> = ({
  entity,
  conflictingId,
  destinationId,
  onSuccess,
}) => {
  const [moveError, setMoveError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<null | File>(null);
  const [newName, setNewName] = useState("");

  const { id, name } = entity;
  const movedFile = entity as File;

  const { close } = useDialog();
  const { show } = usePopup();
  const { sendRequest: sendGet } = useAxios({
    onSuccess(response) {
      const data = response.data;
      const file: File = {
        id: data.id,
        name: data._name,
        size: data.size,
        uploadAt: data.uploadAt,
        type: "file",
      };
      setOriginalFile(file);
    },
  });
  const { sendRequest: sendMove } = useAxios({
    onSuccess(response) {
      show(`Файл успешно перемещён`, { iconType: "success" });
      close();
      onSuccess?.();
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj?.msg) setMoveError(errorObj.msg);
      }

      if (error?.response?.data?.conflictingId)
        setMoveError("Файл с таким именем уже есть!");
    },
  });

  useEffect(() => {
    sendGet(get(conflictingId));
  }, []);

  const handleOverwrite = () =>
    sendMove(move({ id: id, parentId: destinationId, overwrite: true }));
  const handleRename = () =>
    sendMove(move({ id: id, parentId: destinationId, newName }));

  return (
    <DialogShell title={`Ошибка перемещения файла ${name}`}>
      <TextField
        text={`Не удалось переместить файл, так как в выбранной папке уже есть файл с именем ${entity.name}.
         Вы может переименовать перемещаемый файл, отменить перемещение, заменить оригинальный файл.`}
      />

      {originalFile && (
        <InfoTile file={originalFile} title={"Оригинальный файл"} />
      )}
      <InfoTile file={movedFile} title={"Перемещаемый файл"} />

      <div>
        <Input
          value={newName}
          setValue={setNewName}
          placeholder={`Новое название перемещаемого файла (${name})`}
        />
        <InputValidationError error={moveError} />
      </div>

      <div className={styles.buttons}>
        <SecondaryButton title="Пропустить" onClick={close} />
        {newName ? (
          <Button title="Переименовать" onClick={handleRename} />
        ) : (
          <Button title="Заменить" onClick={handleOverwrite} />
        )}
      </div>
    </DialogShell>
  );
};

export default MoveFileConflictDialog;
