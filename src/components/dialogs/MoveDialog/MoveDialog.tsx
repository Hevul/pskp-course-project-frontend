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
import { move as moveDir } from "../../../api/dir";
import { move as moveFile } from "../../../api/file";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";
import { useStorage } from "../../../contexts/StorageContext";
import MoveFileConflictDialog from "../MoveFileConflictDialog/MoveFileConflictDialog";
import MoveDirConflictDialog from "../MoveDirConflictDialog/MoveDirConflictDialog";

interface Props {
  entity: Entity;
  onSuccess?: () => void;
}

const MoveDialogContent: FC<Props> = ({ entity, onSuccess }) => {
  const [moveError, setMoveError] = useState<string | null>(null);
  const [currentEntity, setCurrentEntity] = useState<Entity>(entity);

  const { show } = usePopup();
  const { storage } = useStorage();
  const { open, close } = useDialog();
  const { entities, currentDir, refresh, setCurrentDir } = useEntities();

  const { id, name, type } = currentEntity;
  const isFile = type === "file";
  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return 0;
  });

  const { sendRequest, loading } = useAxios({
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
      }
    },
    onError(error) {
      show(`Не удалось переместить ${isFile ? "файл" : "папку"}!`, {
        iconType: "error",
      });

      const conflictingId = error?.response?.data?.conflictingId;

      if (conflictingId && isFile) {
        open(
          <MoveFileConflictDialog
            entity={entity}
            conflictingId={conflictingId}
            destinationId={currentDir?.id}
            onSuccess={() => {
              close();
              setCurrentDir(null);
              onSuccess?.();
            }}
          />
        );

        setMoveError(
          "Файл с таким же именем уже существует в выбранной папке!"
        );
      } else if (conflictingId && !isFile) {
        open(
          <MoveDirConflictDialog
            entity={entity}
            conflictingId={conflictingId}
            destinationId={currentDir?.id}
            onSuccess={() => {
              close();
              onSuccess?.();
            }}
          />
        );

        setMoveError(
          "Папка с таким же именем уже существует в выбранной папке!"
        );
      } else {
        const errors = error?.response?.data?.errors;

        if (errors) {
          const errorObj = errors[0];
          if (errorObj) {
            setMoveError(errorObj.msg);
          }
        }
      }
    },
  });

  const handleMove = () =>
    sendRequest(
      isFile
        ? moveFile({ id: currentEntity.id, parentId: currentDir?.id })
        : moveDir({ id: currentEntity.id, parentId: currentDir?.id })
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
        <Button title="Переместить" onClick={handleMove} loading={loading} />
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
