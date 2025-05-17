import { useEffect, useRef } from "react";
import { useEntities } from "../../../../contexts/EntitiesContext";
import styles from "./StorageTableTiled.module.css";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../../../components/icons/EmptyBoxIcon";
import { useStorage } from "../../../../contexts/StorageContext";
import FileTile from "../FileTile/FileTile";
import DirTile from "../DirTile/DirTile";
import { useSelectedEntities } from "../../../../contexts/SelectedEntitiesContext";
import { useDialog } from "../../../../contexts/DialogContext";
import CreateStorageDialog from "../../../../components/dialogs/CreateStorageDialog/CreateStorageDialog";
import FileUploader, { FileUploaderRef } from "../FileUploader/FileUploader";
import CreateDirDialog from "../../../../components/dialogs/CreateDirDialog/CreateDirDialog";

const StorageTableTiled = () => {
  const { entities } = useEntities();
  const { storage, refresh } = useStorage();
  const { clearSelection } = useSelectedEntities();
  const { open } = useDialog();
  const { currentDir, refresh: refreshEntities } = useEntities();

  const fileUploaderRef = useRef<FileUploaderRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedEntities = [...entities].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;

    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const isEmpty = sortedEntities.length === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearSelection]);

  const handleCreateStorage = () => {
    open(<CreateStorageDialog onSuccess={() => refresh()} />);
  };

  return (
    <div
      ref={containerRef}
      className={styles.table}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest(".tile")) {
          clearSelection();
        }
      }}
    >
      {isEmpty || !storage ? (
        <div className={styles.emptyDiv}>
          <EmptyState
            message="Нет доступных файлов или папок"
            subMessage={
              storage ? (
                <>
                  <span
                    className={styles.clickableText}
                    onClick={() =>
                      open(
                        <CreateDirDialog
                          currentDir={currentDir}
                          onSuccess={refreshEntities}
                        />
                      )
                    }
                  >
                    Создайте новую папку
                  </span>
                  <span> или </span>
                  <span
                    className={styles.clickableText}
                    onClick={() => fileUploaderRef.current?.triggerFileDialog()}
                  >
                    загрузить файлы
                  </span>
                </>
              ) : (
                <>
                  <span>Выберите хранилище или </span>
                  <span
                    className={styles.clickableText}
                    onClick={handleCreateStorage}
                  >
                    создайте новое
                  </span>
                </>
              )
            }
            icon={<EmptyBoxIcon />}
          />
        </div>
      ) : (
        sortedEntities.map((e) =>
          e.type === "file" ? (
            <FileTile key={e.id} file={e} />
          ) : (
            <DirTile key={e.id} dir={e} />
          )
        )
      )}

      <FileUploader ref={fileUploaderRef} />
    </div>
  );
};

export default StorageTableTiled;
