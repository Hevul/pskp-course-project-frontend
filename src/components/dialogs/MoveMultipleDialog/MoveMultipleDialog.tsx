import { FC, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./MoveMultipleDialog.module.css";
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
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";
import { useStorage } from "../../../contexts/StorageContext";
import { moveMultiple } from "../../../api/entity";
import MoveFileConflictDialog from "../MoveFileConflictDialog/MoveFileConflictDialog";
import MoveDirConflictDialog from "../MoveDirConflictDialog/MoveDirConflictDialog";
import CopyMoveErrorDetailsDialog from "../CopyMoveErrorDetailsDialog/CopyMoveErrorDetailsDialog";

interface Props {
  selectedEntities: Entity[];
  onSuccess?: () => void;
}

const MoveMultipleDialogContent: FC<Props> = ({
  selectedEntities,
  onSuccess,
}) => {
  const [resolvedCount, setResolvedCount] = useState(0);
  const [conflictsCount, setConflictsCount] = useState(0);
  const [moveError, setMoveError] = useState<string | null>(null);

  const { show } = usePopup();
  const { storage } = useStorage();
  const { open, close } = useDialog();
  const { entities, currentDir, refresh, setCurrentDir } = useEntities();

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;

    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      show(
        `Объекты перемещёны в ${currentDir ? currentDir.name : storage?.name}!`,
        {
          iconType: "success",
        }
      );
      close();
      onSuccess?.();
    },
    onError(error) {
      show(`Не удалось переместить все или некоторые объекты!`, {
        iconType: "error",
      });

      setMoveError("Не удалось переместить все или некоторые объекты!");

      const errorData = error?.response?.data;

      if (errorData?.errors) {
        const dialogErrors = errorData.errors.map((err: any) => ({
          name: err.name,
          type: err.type,
          reason: err.error || err.message,
        }));

        open(<CopyMoveErrorDetailsDialog errors={dialogErrors} />);

        return;
      }

      refresh();
      onSuccess?.(); // Бог меня судить будет

      const conflicts: {
        conflictingFiles?: { movedId: string; originalId: string }[];
        conflictingDirs?: { movedId: string; originalId: string }[];
      } = errorData;

      if (conflicts) {
        const filesCount = errorData.conflictingFiles?.length || 0;
        const dirsCount = errorData.conflictingDirs?.length || 0;
        const totalConflicts = filesCount + dirsCount;

        if (totalConflicts > 0) {
          setConflictsCount(totalConflicts);
          setResolvedCount(0);

          const handleConflictResolved = () => {
            setResolvedCount((prev) => {
              const newCount = prev + 1;
              if (newCount >= totalConflicts) {
                close();
                onSuccess?.();
              }
              return newCount;
            });
          };

          conflicts.conflictingFiles?.forEach((conflict) => {
            open(
              <MoveFileConflictDialog
                entity={
                  selectedEntities.find((f) => f.id === conflict.movedId)!
                }
                conflictingId={conflict.originalId}
                destinationId={currentDir?.id}
                onSuccess={handleConflictResolved}
              />
            );
          });

          conflicts.conflictingDirs?.forEach((conflict) => {
            open(
              <MoveDirConflictDialog
                entity={
                  selectedEntities.find((f) => f.id === conflict.movedId)!
                }
                conflictingId={conflict.originalId}
                destinationId={currentDir?.id}
                onSuccess={handleConflictResolved}
              />
            );
          });
        }
      }
    },
  });

  const handleMove = () =>
    sendRequest(
      moveMultiple({
        fileIds: selectedEntities
          .filter((e) => e.type === "file")
          .map((e) => e.id),
        dirIds: selectedEntities
          .filter((e) => e.type === "dir")
          .map((e) => e.id),
        destinationId: currentDir?.id,
      })
    );

  return (
    <DialogShell title={`Куда переместить выбранные объекты?`}>
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

const MoveMultipleDialog: FC<Props> = (props) => {
  return (
    <EntitiesProvider>
      <MoveMultipleDialogContent {...props} />
    </EntitiesProvider>
  );
};

export default MoveMultipleDialog;
