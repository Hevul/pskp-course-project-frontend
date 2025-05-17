import { FC, useState } from "react";
import { Entity } from "../../../models/Entity";
import DialogShell from "../DialogShell";
import styles from "./CopyMultipleDialog.module.css";
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
import { copyMultiple } from "../../../api/entity";
import CopyErrorInfoDialog from "../CopyErrorInfoDialog/CopyErrorInfoDialog";

interface Props {
  selectedEntities: Entity[];
  onSuccess?: () => void;
}

const CopyMultipleDialogContent: FC<Props> = ({
  selectedEntities,
  onSuccess,
}) => {
  const [copyError, setCopyError] = useState<string | null>(null);

  const { show } = usePopup();
  const { storage } = useStorage();
  const { open, close } = useDialog();
  const { entities, currentDir, refresh } = useEntities();

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;

    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      show(
        `Объекты скопированы в ${
          currentDir ? currentDir.name : storage?.name
        }!`,
        {
          iconType: "success",
        }
      );
      close();
      onSuccess?.();
    },
    onError(error) {
      show(`Не удалось скопировать объекты!`, {
        iconType: "error",
      });

      setCopyError(`Не удалось скопировать объекты!`);

      const errorData = error?.response?.data;

      if (errorData && !errorData.success) {
        const errors = Object.keys(errorData)
          .filter((key) => !["success", "message"].includes(key))
          .map((key) => ({
            name: errorData[key].name,
            type: errorData[key].type,
            reason: errorData[key].error,
          }));

        open(<CopyErrorInfoDialog errors={errors} />);
      }
    },
  });

  const handleCopy = () =>
    sendRequest(
      copyMultiple({
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
    <DialogShell title={`Куда копировать выбранные объекты?`}>
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
        <Button title="Копировать" onClick={handleCopy} loading={loading} />
      </div>
    </DialogShell>
  );
};

const CopyMultipleDialog: FC<Props> = (props) => {
  return (
    <EntitiesProvider>
      <CopyMultipleDialogContent {...props} />
    </EntitiesProvider>
  );
};

export default CopyMultipleDialog;
