import { FC, useEffect, useRef, useState } from "react";
import File from "../../../../models/File";
import styles from "./FileTile.module.css";
import { useEntities } from "../../../../contexts/EntitiesContext";
import { Entity } from "../../../../models/Entity";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import DownloadIcon from "../../../../components/icons/DownloadIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import { download, remove as removeFile } from "../../../../api/files";
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

interface Props {
  file: File;
  selectedEntity: Entity | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
}

const FileTile: FC<Props> = ({ file, selectedEntity, setSelectedEntity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { refresh } = useEntities();
  const { open } = useDialog();
  const { show } = usePopup();

  const { sendRequest: sendDownload } = useAxios({
    onSuccess(response) {
      show(`Файл ${name} скачан!`, {
        iconType: "success",
      });
    },
  });
  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      show(`Файл ${name} удалён!`, {
        iconType: "success",
      });
    },
  });

  const { id, name } = file;
  const ext = name.split(".").pop() || "";

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [name]);

  const handleDownload = async () => {
    show("Скачивание файла скоро начнётся!", { iconType: "info" });
    const response = await sendDownload(download(id));

    if (!response) return;

    fileDownload(response.data, name);
  };

  const handleDelete = async () => {
    await sendDelete(removeFile(id));
    refresh();
  };

  const isSelected = selectedEntity?.id === id;

  const menuItems = [
    {
      title: "Скачать файл",
      icon: <DownloadIcon width="16" />,
      action: handleDownload,
      hasSeparator: true,
    },
    {
      title: "Поделиться",
      icon: <AddUserIcon width="16" />,
      action: () => open(<LinkDialog file={file} />),
      hasSeparator: true,
    },
    {
      title: `Переименовать файл`,
      icon: <EditIcon width="18" />,
      action: () => open(<RenameDialog entity={file} />),
    },
    {
      title: `Копировать файл`,
      icon: <CopyIcon width="18" />,
      action: () => open(<CopyDialog entity={file} onSuccess={refresh} />),
    },
    {
      title: `Переместить файл`,
      icon: <CurvedIcon width="18" />,
      action: () => open(<MoveDialog entity={file} onSuccess={refresh} />),
    },
    {
      title: `Удалить файл`,
      icon: <DeleteIcon width="18" />,
      action: handleDelete,
      hasSeparator: true,
    },
    {
      title: `Информация о файле`,
      icon: <InfoSquareIcon width="18" />,
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
      onClick={() => setSelectedEntity(file)}
      style={{
        backgroundColor: isSelected
          ? "#4676FB"
          : isHovered
          ? "#ECF5FE"
          : "white",
      }}
    >
      <ContextMenuArea items={menuItems}>
        <div
          className={styles.tileContainer}
          onContextMenu={() => setSelectedEntity(file)}
        >
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
