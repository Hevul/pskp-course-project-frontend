import { FC, useEffect, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./MoveDialog.module.css";
import Button from "../../Button/Button";
import {
  EntitiesProvider,
  useEntities,
} from "../../../contexts/EntitiesContext";
import EntityRow from "../../EntityRow/EntityRow";
import Path from "../../Path/Path";
import { useDialog } from "../../../contexts/DialogContext";
import CreateDirDialog from "../CreateDirDialog/CreateDirDialog";
import PlusIcon from "../../icons/PlusIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import useAxios from "../../../hooks/useAxios";
import { move as moveDir } from "../../../api/dirs";
import { move as moveFile } from "../../../api/files";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";
import { useStorage } from "../../../contexts/StorageContext";

interface Props {
  entity: Entity;
  onSuccess?: () => void;
}

const MoveDialogContent: FC<Props> = ({ entity, onSuccess }) => {
  const [moveError, setMoveError] = useState<string | null>(null);

  const { show } = usePopup();
  const { storage } = useStorage();
  const { open, close } = useDialog();
  const { entities, currentDir, refresh } = useEntities();

  const { id, name, type } = entity;
  const isFile = type === "file";
  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return 0;
  });

  const { sendRequest } = useAxios({
    onSuccess(response) {
      if (response.status === 200) {
        show(
          `${isFile ? "Файл" : "Папка"} ${name} перемещён${
            isFile ? "" : "а"
          } в ${currentDir ? currentDir.name : storage?.name}!`,
          {
            iconType: "success",
          }
        );
        close();
        onSuccess?.();
        refresh();
      }
    },
    onError(error) {
      show(`Не удалось переместить ${isFile ? "файл" : "папка"}!`, {
        iconType: "error",
      });

      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setMoveError(errorObj.msg);
      }
    },
  });

  const handleMove = () =>
    sendRequest(
      isFile ? moveFile(id, currentDir?.id) : moveDir(id, currentDir?.id)
    );

  return (
    <DialogShell
      title={`Куда переместить ${isFile ? "файл" : "папку"} '${name}'?`}
    >
      <Path />

      <InputValidationError error={moveError} />

      <div className={styles.tiles}>
        {sortedEntities.map((e) => (
          <EntityRow key={e.id} entity={e} />
        ))}
      </div>
      <div className={styles.buttons}>
        <SecondaryButton
          title="Новая папка"
          onClick={() =>
            open(
              <CreateDirDialog currentDir={currentDir} onSuccess={refresh} />
            )
          }
          icon={<PlusIcon />}
        />
        <Button title="Переместить" onClick={handleMove} />
      </div>
    </DialogShell>
  );
};

const MoveDialog: FC<Props> = (props) => {
  return (
    <EntitiesProvider>
      <MoveDialogContent {...props} />
    </EntitiesProvider>
  );
};

export default MoveDialog;
