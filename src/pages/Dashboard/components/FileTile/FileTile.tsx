import { FC, useEffect, useRef, useState } from "react";
import File from "../../../../models/File";
import styles from "./FileTile.module.css";
import { useEntities } from "../../../../contexts/EntitiesContext";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import DownloadIcon from "../../../../components/icons/DownloadIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import {
  download,
  downloadMultiple,
  remove as removeFile,
} from "../../../../api/file";
import { remove as removeDir } from "../../../../api/dir";
import ContextMenuArea from "../../../../components/ContextMenuArea/ContextMenuArea";
import RenameDialog from "../../../../components/dialogs/RenameDialog/RenameDialog";
import { useDialog } from "../../../../contexts/DialogContext";
import fileDownload from "js-file-download";
import useAxios from "../../../../hooks/useAxios";
import ExtFileIcon from "../../../../components/icons/fileExts/ExtFileIcon";
import InfoDialog from "../../../../components/dialogs/InfoDialog/InfoDialog";
import InfoSquareIcon from "../../../../components/icons/InfoSquareIcon";
import CopyDialog from "../../../../components/dialogs/CopyDialog/CopyDialog";
import CopyIcon from "../../../../components/icons/CopyIcon";
import MoveDialog from "../../../../components/dialogs/MoveDialog/MoveDialog";
import CurvedIcon from "../../../../components/icons/CurvedIcon";
import LinkDialog from "../../../../components/dialogs/LinkDialog/LinkDialog";
import AddUserIcon from "../../../../components/icons/AddUserIcon";
import LinkIcon from "../../../../components/icons/LinkIcon";
import { usePopup } from "../../../../contexts/PopupContext";
import { formatDate, formatSize } from "../../../../utils";
import ShowIcon from "../../../../components/icons/ShowIcon";
import FileViewer from "../../../../components/viewers/FileViewer";
import { useFileViewer } from "../../../../contexts/FileViewerContext";
import { useSelectedEntities } from "../../../../contexts/SelectedEntitiesContext";
import { MenuItem } from "../../../../contexts/ContextMenuContext";
import config from "../../../../config.json";
import ConfirmDeletionDialog from "../../../../components/dialogs/ConfirmDeletionDialog/ConfirmDeletionDialog";
import MoveMultipleDialog from "../../../../components/dialogs/MoveMultipleDialog/MoveMultipleDialog";
import CopyMultipleDialog from "../../../../components/dialogs/CopyMultipleDialog/CopyMultipleDialog";

interface Props {
  file: File;
}

const FileTile: FC<Props> = ({ file }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { refresh, setCurrentDir } = useEntities();
  const { open } = useDialog();
  const { view } = useFileViewer();
  const { show } = usePopup();
  const {
    selectedEntities,
    toggleEntitySelection,
    setSelectedEntities,
    handleDeleteSelected,
    handleDownloadSelected,
  } = useSelectedEntities();

  const { id, name } = file;
  const isSelected = selectedEntities.some((e) => e.id === id);
  const ext = name.split(".").pop() || "";
  const isMultipleSelection = selectedEntities.length > 1;

  const { sendRequest: sendRemove } = useAxios({
    onSuccess() {
      show(`Файл ${file.name} удален`, { iconType: "success" });
      refresh();
    },
  });

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [name]);

  const handleOpen = () => {
    view(<FileViewer filename={file.name} fileId={file.id} />);
  };

  const handleSingleDownload = async () => {
    show("Скачивание файла...", { iconType: "info" });

    const url = `${config.base}/${config.file}`;

    const link = document.createElement("a");
    link.href = `${url}/download/${id}`;
    link.style.display = "none";
    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  const handleMultipleDownload = async () => {
    show("Подготовка архива...", { iconType: "info" });

    const fileIds = selectedEntities
      .filter((e) => e.type === "file")
      .map((e) => e.id);

    const encodedIds = encodeURIComponent(JSON.stringify(fileIds));

    const downloadUrl = `${config.base}/${config.file}/download-many?fileIds=${encodedIds}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.style.display = "none";
    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);

    show(
      `Начато скачивание ${fileIds.length} файлов. Не удалось вычислить размер архива.`,
      {
        iconType: "info",
      }
    );
  };

  const handleDownload = () => {
    if (isMultipleSelection) handleMultipleDownload();
    else handleSingleDownload();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 1) toggleEntitySelection(file, e);
    else if (e.detail === 2) handleOpen();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      toggleEntitySelection(file, e);
    } else if (!isSelected) {
      setSelectedEntities([file]);
    }
  };

  const handleDelete = async () => {
    if (selectedEntities.length < 2) {
      sendRemove(removeFile(file.id));
    } else {
      open(
        <ConfirmDeletionDialog
          onConfirm={handleDeleteSelected}
          entities={selectedEntities}
        />
      );
    }
  };

  const menuItems: MenuItem[] = [
    {
      title: "Открыть файл",
      icon: <ShowIcon width="18" />,
      action: handleOpen,
      hasSeparator: true,
      disabled: isMultipleSelection,
    },
    {
      title: `Скачать ${
        isMultipleSelection
          ? `файлы (${
              selectedEntities.filter((e) => e.type === "file").length
            })`
          : `файл`
      }`,
      icon: <DownloadIcon width="16" />,
      action: handleDownload,
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
      title: "Поделиться",
      icon: <AddUserIcon width="16" />,
      action: () => open(<LinkDialog fileId={file.id} />),
      hasSeparator: true,
      disabled: isMultipleSelection,
    },
    {
      title: `Переименовать файл`,
      icon: <EditIcon width="18" />,
      action: () => open(<RenameDialog entity={file} />),
      disabled: isMultipleSelection,
    },
    {
      title: `Копировать файл`,
      icon: <CopyIcon width="18" />,
      action: () => open(<CopyDialog entity={file} onSuccess={refresh} />),
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
      title: `Переместить файл`,
      icon: <CurvedIcon width="18" />,
      action: () =>
        open(
          <MoveDialog
            entity={file}
            onSuccess={() => {
              refresh();
            }}
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
              setCurrentDir(null);
              refresh();
            }}
          />
        ),
      disabled: !isMultipleSelection,
    },
    {
      title: `Удалить ${
        isMultipleSelection ? `(${selectedEntities.length})` : `файл`
      }`,
      icon: <DeleteIcon width="18" />,
      action: handleDelete,
      hasSeparator: true,
    },
    {
      title: `Информация о файле`,
      icon: <InfoSquareIcon width="18" />,
      disabled: isMultipleSelection,
      action: () =>
        open(
          <InfoDialog
            title={`Информация о файле`}
            fields={[
              { label: "Название:", value: name },
              { label: "Размер:", value: formatSize(file.size) },
              { label: "Тип:", value: ext.toUpperCase() },
              {
                label: "Дата создания:",
                value: formatDate(file.uploadAt),
              },
              ...(file.updateAt
                ? [
                    {
                      label: "Дата обновления:",
                      value: formatDate(file.updateAt),
                    },
                  ]
                : []),
              {
                label: "Доступ по ссылке:",
                value: file.hasLink ? "Да" : "Нет",
              },
            ]}
          />
        ),
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
          <ExtFileIcon
            ext={ext}
            width="40"
            color={isSelected ? "white" : "#4676FB"}
            fontColor={isSelected ? "#4676FB" : "white"}
          />

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

          {file.hasLink && (
            <div className={styles.linkIcon}>
              <LinkIcon width="22" color={isSelected ? "white" : "#4676FB"} />
            </div>
          )}
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default FileTile;
