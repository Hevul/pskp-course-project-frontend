import { FC, useEffect } from "react";
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
import { copy as copyDir } from "../../../api/dirs";
import { copy as copyFile } from "../../../api/files";
import InputValidationError from "../../InputValidationError/InputValidationError";

interface Props {
  entity: Entity;
  onSuccess?: () => void;
}

const CopyDialogContent: FC<Props> = ({ entity, onSuccess }) => {
  const { id, name, type } = entity;

  const { entities, currentDir, refresh } = useEntities();
  const { open, close } = useDialog();
  const { sendRequest, response, error } = useAxios();

  const isFile = type === "file";

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return 0;
  });

  const handleCopy = () =>
    sendRequest(
      isFile ? copyFile(id, currentDir?.id) : copyDir(id, currentDir?.id)
    );

  useEffect(() => {
    if (response?.status === 200) {
      close();
      onSuccess?.();
    }
  }, [response]);

  let errorMsg: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    const errorObj = errors[0];
    if (errorObj) errorMsg = errorObj.msg;
  }

  return (
    <DialogShell
      title={`Куда копировать ${isFile ? "файл" : "папку"} '${name}'?`}
    >
      <Path />

      <InputValidationError error={errorMsg} />

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
        <Button title="Копировать" onClick={handleCopy} />
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
