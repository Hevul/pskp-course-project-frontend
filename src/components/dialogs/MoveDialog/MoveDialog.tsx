import { FC, useEffect } from "react";
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

interface Props {
  entity: Entity;
  onSuccess?: () => void;
}

const MoveDialogContent: FC<Props> = ({ entity, onSuccess }) => {
  const { id, name, type } = entity;

  const { entities, currentDir, refresh } = useEntities();
  const { open, close } = useDialog();
  const { sendRequest, response } = useAxios();

  const isFile = type === "file";

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return 0;
  });

  const handleMove = () =>
    sendRequest(
      isFile ? moveFile(id, currentDir?.id) : moveDir(id, currentDir?.id)
    );

  useEffect(() => {
    if (response?.status === 200) {
      close();
      onSuccess?.();
    }
  }, [response]);

  return (
    <DialogShell
      title={`Куда переместить ${isFile ? "файл" : "папку"} '${name}'?`}
    >
      <Path />
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
