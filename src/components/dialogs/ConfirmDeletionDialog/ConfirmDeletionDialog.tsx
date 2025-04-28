import { FC } from "react";
import DialogShell from "../DialogShell";
import styles from "./styles.module.css";
import Button from "../../Button/Button";
import { Entity } from "../../../models/Entity";
import { useDialog } from "../../../contexts/DialogContext";
import FolderIcon from "../../icons/FolderIcon";
import FileIcon from "../../icons/FileIcon";
import { formatSize } from "../../../utils";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import { useSelectedEntities } from "../../../contexts/SelectedEntitiesContext";

interface Props {
  entities: Entity[];
  onConfirm: () => void;
}

const ConfirmDeletionDialog: FC<Props> = ({ entities, onConfirm }) => {
  const { close } = useDialog();
  const { isDeleting } = useSelectedEntities();

  console.log(isDeleting);

  return (
    <DialogShell title={`Вы правда хотите удалить выбранные объекты?`}>
      <div className={styles.objectsList}>
        {entities.map((entity) => (
          <div key={entity.id} className={styles.objectItem}>
            {entity.type === "dir" ? (
              <FolderIcon color="#4676FB" />
            ) : (
              <FileIcon color="#4676FB" />
            )}
            <span className={styles.name}>
              {entity.name}
              {entity.type === "file" && (
                <span className={styles.fileSize}>
                  ({formatSize(entity.size)})
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <SecondaryButton title="Отмена" onClick={close} />
        <Button
          title="Удалить"
          onClick={() => {
            onConfirm();
            close();
          }}
          color="#FF3030"
          singleClick={true}
          disabled={isDeleting}
        />
      </div>
    </DialogShell>
  );
};

export default ConfirmDeletionDialog;
