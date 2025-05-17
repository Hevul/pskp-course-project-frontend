import { FC, useEffect, useRef, useState } from "react";
import Dir from "../../../../models/Dir";
import styles from "./DirTile.module.css";
import FolderIcon from "../../../../components/icons/FolderIcon";
import { useStorage } from "../../../../contexts/StorageContext";
import { useEntities } from "../../../../contexts/EntitiesContext";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import { getFullInfo, remove as removeDir } from "../../../../api/dir";
import ContextMenuArea from "../../../../components/ContextMenuArea/ContextMenuArea";
import RenameDialog from "../../../../components/dialogs/RenameDialog/RenameDialog";
import { useDialog } from "../../../../contexts/DialogContext";
import useAxios from "../../../../hooks/useAxios";
import InfoSquareIcon from "../../../../components/icons/InfoSquareIcon";
import CopyDialog from "../../../../components/dialogs/CopyDialog/CopyDialog";
import CopyIcon from "../../../../components/icons/CopyIcon";
import MoveDialog from "../../../../components/dialogs/MoveDialog/MoveDialog";
import CurvedIcon from "../../../../components/icons/CurvedIcon";
import { usePopup } from "../../../../contexts/PopupContext";
import InfoDialog from "../../../../components/dialogs/InfoDialog/InfoDialog";
import { formatDate, formatSize } from "../../../../utils";
import { useSelectedEntities } from "../../../../contexts/SelectedEntitiesContext";
import { MenuItem } from "../../../../contexts/ContextMenuContext";
import DownloadIcon from "../../../../components/icons/DownloadIcon";
import config from "../../../../config.json";
import ConfirmDeletionDialog from "../../../../components/dialogs/ConfirmDeletionDialog/ConfirmDeletionDialog";
import MoveMultipleDialog from "../../../../components/dialogs/MoveMultipleDialog/MoveMultipleDialog";
import CopyMultipleDialog from "../../../../components/dialogs/CopyMultipleDialog/CopyMultipleDialog";

interface Props {
  dir: Dir;
}

const DirTile: FC<Props> = ({ dir }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { setCurrentDir, refresh } = useEntities();
  const { storage } = useStorage();
  const { open } = useDialog();
  const { show } = usePopup();
  const {
    selectedEntities,
    toggleEntitySelection,
    handleDeleteSelected,
    handleDownloadSelected,
    clearSelection,
  } = useSelectedEntities();

  const { id, name } = dir;
  const isSelected = selectedEntities.some((e) => e.id === id);
  const isMultipleSelection = selectedEntities.length > 1;

  const { sendRequest: sendRemove } = useAxios({
    onSuccess(response) {
      show(`Папка ${dir.name} удалена`, { iconType: "success" });
      refresh();
    },
  });
  const { sendRequest: sendGetFullInfo } = useAxios({
    onSuccess(response) {
      const fullInfo = response.data;
      open(
        <InfoDialog
          title="Информация о папке"
          fields={[
            {
              label: "Название:",
              value: fullInfo.name,
            },
            { label: "Размер:", value: formatSize(fullInfo.size) },
            {
              label: "Дата создания:",
              value: formatDate(fullInfo.createAt),
            },
            {
              label: "Количество файлов:",
              value: fullInfo.fileCount.toString(),
            },
            {
              label: "Количество папок:",
              value: fullInfo.dirCount.toString(),
            },
            {
              label: "Путь до содержимого папки:",
              value: fullInfo.path,
            },
          ]}
        />
      );
    },
  });

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [name]);

  const handleDirEnter = () => {
    if (!storage) return;
    setCurrentDir({
      ...dir,
    });
  };

  const handleDelete = async () => {
    if (selectedEntities.length < 2) {
      sendRemove(removeDir(dir.id));
    } else {
      open(
        <ConfirmDeletionDialog
          onConfirm={handleDeleteSelected}
          entities={selectedEntities}
        />
      );
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 1) toggleEntitySelection(dir, e);
    else if (e.detail === 2) {
      handleDirEnter();
      clearSelection();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSelected || e.ctrlKey || e.metaKey) toggleEntitySelection(dir, e);
  };

  const handleSingleDownload = () => {
    show("Подготовка архива...", { iconType: "info" });

    const link = document.createElement("a");
    link.href = `${config.server}/${config.routes.dir}/download/${id}`;
    link.style.display = "none";
    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);

    show(
      `Начато скачивание папки ${name}. Не удалось вычислить размер архива.`,
      {
        iconType: "info",
      }
    );
  };

  const menuItems: MenuItem[] = [
    {
      title: `Скачать папку`,
      icon: <DownloadIcon width="16" />,
      action: handleSingleDownload,
      hasSeparator: !isMultipleSelection,
    },
    {
      title: `Скачать всё (${selectedEntities.length})`,
      icon: <DownloadIcon width="16" />,
      action: handleDownloadSelected,
      hasSeparator: true,
      disabled: !isMultipleSelection,
    },
    {
      title: `Переименовать папку`,
      icon: <EditIcon width="18" />,
      action: () => open(<RenameDialog entity={dir} />),
      disabled: isMultipleSelection,
    },
    {
      title: `Копировать папку`,
      icon: <CopyIcon width="18" />,
      action: () => open(<CopyDialog entity={dir} onSuccess={refresh} />),
      disabled: isMultipleSelection,
    },
    {
      title: `Копировать всё (${selectedEntities.length})`,
      icon: <CopyIcon width="18" />,
      action: () =>
        open(
          <CopyMultipleDialog
            selectedEntities={selectedEntities}
            onSuccess={() => refresh()}
          />
        ),
      disabled: !isMultipleSelection,
    },
    {
      title: `Переместить папку`,
      icon: <CurvedIcon width="18" />,
      action: () =>
        open(
          <MoveDialog
            entity={dir}
            onSuccess={() => {
              refresh();
            }}
            setCurrentDirOut={setCurrentDir}
          />
        ),
      disabled: isMultipleSelection,
    },
    {
      title: `Переместить всё (${selectedEntities.length})`,
      icon: <CurvedIcon width="18" />,
      action: () =>
        open(
          <MoveMultipleDialog
            selectedEntities={selectedEntities}
            onSuccess={() => {
              refresh();
            }}
          />
        ),
      disabled: !isMultipleSelection,
    },
    {
      title: `Удалить ${
        isMultipleSelection ? ` всё (${selectedEntities.length})` : `папку`
      }`,
      icon: <DeleteIcon width="18" />,
      action: handleDelete,
      hasSeparator: true,
    },
    {
      title: `Информация о папке`,
      icon: <InfoSquareIcon width="18" />,
      action: () => sendGetFullInfo(getFullInfo(id)),
      disabled: isMultipleSelection,
    },
  ];

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`${styles.tile} tile`}
      onClick={handleClick}
      style={{
        backgroundColor: isSelected
          ? "#4676FB"
          : isHovered
          ? "#ECF5FE"
          : "white",
      }}
    >
      <ContextMenuArea items={menuItems}>
        <div className={styles.tileContainer} onContextMenu={handleContextMenu}>
          <FolderIcon width="40" color={isSelected ? "white" : "#4676FB"} />

          <div className={styles.textContainer}>
            <h1
              ref={textRef}
              className={`${styles.h1} ${needsWrap ? styles.allowWrap : ""}`}
              title={name}
              style={{ color: isSelected ? "white" : "#4676FB" }}
            >
              {name}
            </h1>
          </div>
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default DirTile;
