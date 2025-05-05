import { FC, useEffect, useState } from "react";
import DeleteIcon from "../../../../components/icons/DeleteIcon";
import OptionsIcon from "../../../../components/icons/OptionsIcon";
import styles from "./LinkRow.module.css";
import FileIcon from "../../../../components/icons/FileIcon";
import CopyIcon from "../../../../components/icons/CopyIcon";
import Link from "../../../../models/Link";
import { usePopup } from "../../../../contexts/PopupContext";
import useAxios from "../../../../hooks/useAxios";
import { useLinks } from "../../../../contexts/LinksContext";
import { getFullInfo, remove } from "../../../../api/link";
import { get } from "../../../../api/file";
import InfoDialog from "../../../../components/dialogs/InfoDialog/InfoDialog";
import { LinkFullInfo } from "../../../../models/LinkFullInfo";
import { useDialog } from "../../../../contexts/DialogContext";
import { formatDate, formatSize } from "../../../../utils";

interface Props {
  id: number;
  link: Link;
}

const LinkRow: FC<Props> = ({ id, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [filename, setFilename] = useState("");

  const { refresh } = useLinks();
  const { show } = usePopup();
  const { open } = useDialog();

  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      show(`Ссылка удалена!`, { iconType: "success" });
      refresh();
    },
  });
  const { sendRequest: sendGetFile } = useAxios({
    onSuccess(response) {
      setFilename(response.data?._name);
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
          ]}
        />
      );
    },
  });

  useEffect(() => {
    sendGetFile(get(link.fileId));
  }, []);

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

  return (
    <div className={styles.row}>
      <h1 className={styles.num}>{id}</h1>
      <div
        className={styles.content}
        style={{
          background: isHovered ? "#4676fb" : "rgba(224, 238, 253, 0.6)",
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className={styles.icon}>
          <FileIcon color={isHovered ? "white" : "#4676fb"} width="36px" />
        </div>

        <p
          className={styles.name}
          style={{ color: isHovered ? "white" : "#4676fb" }}
        >
          {filename}
        </p>

        <p
          className={styles.status}
          style={{ color: isHovered ? "white" : "#4676fb" }}
        >
          {link.status === "public" ? "Публичная" : "Приватная"}
        </p>

        <div className={styles.buttons}>
          <div
            className={styles.button}
            title="Копировать ссылку"
            onClick={handleCopy}
          >
            <CopyIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>

          <div className={styles.button} title="Удалить" onClick={handleRemove}>
            <DeleteIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>

          <div
            className={styles.button}
            title="Информация о ссылке"
            onClick={handleFullInfo}
          >
            <OptionsIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkRow;
