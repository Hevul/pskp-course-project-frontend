import { FC, useEffect, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./CopyDialog.module.css";
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
import { copy as copyDir } from "../../../api/dir";
import { copy as copyFile } from "../../../api/file";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { usePopup } from "../../../contexts/PopupContext";
import { useStorage } from "../../../contexts/StorageContext";
import RenameDialog from "../RenameDialog/RenameDialog";

interface Props {
  entity: Entity;
  onSuccess?: () => void;
}

const CopyDialogContent: FC<Props> = ({ entity, onSuccess }) => {
  const [copyError, setCopyError] = useState<string | null>(null);
  const [currentEntity, setCurrentEntity] = useState<Entity>(entity);

  const { show } = usePopup();
  const { storage } = useStorage();
  const { open, close } = useDialog();
  const { entities, currentDir, refresh } = useEntities();

  const { id, name, type } = currentEntity;
  const isFile = type === "file";

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;

    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      show(
        `${isFile ? "Файл" : "Папка"} ${name} скопирован${
          isFile ? "" : "а"
        } в ${currentDir ? currentDir.name : storage?.name}!`,
        {
          iconType: "success",
        }
      );
      close();
      onSuccess?.();
      refresh();
    },
    onError(error) {
      show(`Не удалось скопировать ${isFile ? "файл" : "папка"}!`, {
        iconType: "error",
      });

      const errors = error?.response?.data?.errors;

      if (errors) {
        const errorObj = errors[0];
        if (errorObj) setCopyError(errorObj.msg);
      }
    },
  });

  const handleCopy = () =>
    sendRequest(
      isFile ? copyFile(id, currentDir?.id) : copyDir(id, currentDir?.id)
    );

  return (
    <DialogShell
      title={`Куда копировать ${isFile ? "файл" : "папку"} '${name}'?`}
    >
      <Path />

      <InputValidationError error={copyError} />

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
        <Button title="Копировать" loading={loading} onClick={handleCopy} />
      </div>
    </DialogShell>
  );
};

const CopyDialog: FC<Props> = (props) => {
  return (
    <EntitiesProvider>
      <CopyDialogContent {...props} />
    </EntitiesProvider>
  );
};

export default CopyDialog;
