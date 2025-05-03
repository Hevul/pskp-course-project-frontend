import { FC, useEffect, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./MoveDirConflictDialog.module.css";
import TextField from "../../TextField/TextField";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import { useDialog } from "../../../contexts/DialogContext";
import Button from "../../Button/Button";
import useAxios from "../../../hooks/useAxios";
import { getFullInfo, move } from "../../../api/dirs";
import Input from "../../Input/Input";
import { usePopup } from "../../../contexts/PopupContext";
import InputValidationError from "../../InputValidationError/InputValidationError";
import InfoTile from "./InfoTile.module";
import { DirFullInfo } from "../../../models/DirFullInfo";

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
  const [movedDir, setMovedDir] = useState<null | DirFullInfo>(null);
  const [originalDir, setOriginalDir] = useState<null | DirFullInfo>(null);
  const [newName, setNewName] = useState("");

  const { id, name } = entity;

  const { close } = useDialog();
  const { show } = usePopup();

  const { sendRequest: sendGetOriginal } = useAxios({
    onSuccess(response) {
      const data = response.data;
      const dir: DirFullInfo = {
        name: data.name,
        createAt: data.createAt,
        fileCount: data.fileCount,
        dirCount: data.dirCount,
        size: data.size,
        path: data.path,
      };
      setOriginalDir(dir);
    },
  });
  const { sendRequest: sendGetMoved } = useAxios({
    onSuccess(response) {
      const data = response.data;
      const dir: DirFullInfo = {
        name: data.name,
        createAt: data.createAt,
        fileCount: data.fileCount,
        dirCount: data.dirCount,
        size: data.size,
        path: data.path,
      };
      setMovedDir(dir);
    },
  });
  const { sendRequest: sendMove } = useAxios({
    onSuccess(response) {
      show(`Папка успешно перемещёна`, { iconType: "success" });
      close();
      onSuccess?.();
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj?.msg) setMoveError(errorObj.msg);
      }

      if (conflictingId) {
        setMoveError(
          "Папка с таким же именем уже существует в выбранной папке!"
        );
      }
    },
  });

  useEffect(() => {
    sendGetOriginal(getFullInfo(conflictingId));
    sendGetMoved(getFullInfo(id));
  }, []);

  const handleRename = () =>
    sendMove(move({ id: id, parentId: destinationId, newName }));

  const handleOverwrite = () =>
    sendMove(move({ id: id, parentId: destinationId, overwrite: true }));

  return (
    <DialogShell title={`Ошибка перемещения папка ${name}`}>
      <TextField
        text={`Не удалось переместить папку, так как в выбранной папке уже есть папка с именем ${entity.name}.
         Вы может переименовать перемещаемую папку, отменить перемещение, заменить оригинальную папку.`}
      />

      {originalDir && (
        <InfoTile dir={originalDir} title={"Оригинальная папка "} />
      )}
      {movedDir && <InfoTile dir={movedDir} title={"Перемещаемая папка "} />}

      <div>
        <Input
          value={newName}
          setValue={setNewName}
          placeholder={`Новое название перемещаемой папки (${name})`}
        />
        <InputValidationError error={moveError} />
      </div>

      <div className={styles.buttons}>
        <SecondaryButton title="Отменить" onClick={close} />

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
