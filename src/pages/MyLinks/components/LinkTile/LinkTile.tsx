import { FC, useEffect, useRef, useState } from "react";
import styles from "./LinkTile.module.css";
import ContextMenuArea from "../../../../components/ContextMenuArea/ContextMenuArea";
import ExtFileIcon from "../../../../components/icons/fileExts/ExtFileIcon";
import ShowIcon from "../../../../components/icons/ShowIcon";
import Link from "../../../../models/Link";
import ShieldIcon from "../../../../components/icons/ShieldIcon";
import PeopleIcon from "../../../../components/icons/PeopleIcon";
import useAxios from "../../../../hooks/useAxios";
import { useLinks } from "../../../../contexts/LinksContext";
import { usePopup } from "../../../../contexts/PopupContext";
import { useDialog } from "../../../../contexts/DialogContext";
import { LinkFullInfo } from "../../../../models/LinkFullInfo";
import InfoDialog from "../../../../components/dialogs/InfoDialog/InfoDialog";
import { formatDate, formatSize } from "../../../../utils";
import { getFullInfo, remove } from "../../../../api/links";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import InfoSquareIcon from "../../../../components/icons/InfoSquareIcon";
import CopyIcon from "../../../../components/icons/CopyIcon";
import EditIcon from "../../../../components/icons/EditIcon";
import LinkDialog from "../../../../components/dialogs/LinkDialog/LinkDialog";
import { view } from "../../../../api/files";
import FileViewer from "../../../../components/viewers/FileViewer";
import { useFileViewer } from "../../../../contexts/FileViewerContext";

interface Props {
  link: Link;
  selectedLink: Link | null;
  setSelectedLink: React.Dispatch<React.SetStateAction<Link | null>>;
}

const LinkTile: FC<Props> = ({ link, selectedLink, setSelectedLink }) => {
  const { id, filename, status } = link;

  const ext = filename?.split(".").pop() || "";
  const isSelected = selectedLink?.id === id;

  const [isHovered, setIsHovered] = useState(false);
  const [needsWrap, setNeedsWrap] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { refresh } = useLinks();
  const { show } = usePopup();
  const { open } = useDialog();
  const { view } = useFileViewer();

  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      show(`Ссылка удалена!`, { iconType: "success" });
      refresh();
    },
  });
  const { sendRequest: sendGetFullInfo } = useAxios({
    onSuccess(response) {
      const fullInfo = response.data.fullInfo as LinkFullInfo;
      open(
        <InfoDialog
          title={"Информация о ссылке"}
          fields={[
            { label: "Название:", value: fullInfo.filename },
            { label: "Размер:", value: formatSize(fullInfo.size) },
            { label: "Владелец:", value: fullInfo.owner },
            { label: "Дата создания:", value: formatDate(fullInfo.createAt) },
            {
              label: "Количество скачиваний:",
              value: `${fullInfo.downloadCount}`,
            },
            {
              label: "Путь до файла:",
              value: `${fullInfo.path}`,
            },
          ]}
        />
      );
    },
  });

  const copyToClipboard = () => {
    const text = `http://localhost:3000/link/${link.link}`;

    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Не удалось скопировать ссылку:", err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    });

    show("Ссылка скопирована в буфер обмена!", { iconType: "success" });
  };

  const handleCopy = () => copyToClipboard();
  const handleFullInfo = () => sendGetFullInfo(getFullInfo(link.id));
  const handleRemove = () => sendDelete(remove(link.id));
  const handleEdit = () => open(<LinkDialog fileId={link.fileId} />);
  const handleOpen = () =>
    view(<FileViewer filename={link.filename ?? ""} fileId={link.fileId} />);

  const menuItems = [
    {
      title: "Открыть файл",
      icon: <ShowIcon width="18" />,
      action: handleOpen,
      hasSeparator: true,
    },
    {
      title: "Редактировать ссылку",
      icon: <EditIcon width="18" />,
      action: handleEdit,
    },
    {
      title: "Скопировать ссылку",
      icon: <CopyIcon width="18" />,
      action: handleCopy,
    },
    {
      title: "Удалить ссылку",
      icon: <DeleteIcon width="18" />,
      action: handleRemove,
      hasSeparator: true,
    },
    {
      title: "Информация о ссылке",
      icon: <InfoSquareIcon width="18" />,
      action: handleFullInfo,
    },
  ];

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > textRef.current.clientWidth;
      setNeedsWrap(isOverflowing);
    }
  }, [filename]);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`${styles.tile} tile`}
      onClick={() => setSelectedLink(link)}
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
          onContextMenu={() => setSelectedLink(link)}
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
              title={filename}
              style={{ color: isSelected ? "white" : "#4676FB" }}
            >
              {filename}
            </h1>
          </div>

          <div className={styles.linkIcon}>
            {status === "public" ? (
              <PeopleIcon width="22" color={isSelected ? "white" : "#4676FB"} />
            ) : (
              <ShieldIcon width="22" color={isSelected ? "white" : "#4676FB"} />
            )}
          </div>
        </div>
      </ContextMenuArea>
    </div>
  );
};

export default LinkTile;
