import { FC, useEffect, useState } from "react";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import OptionsIcon from "../../../components/icons/OptionsIcon";
import styles from "./LinkRow.module.css";
import FileIcon from "../../../components/icons/FileIcon";
import CopyIcon from "../../../components/icons/CopyIcon";
import Link from "../../../models/Link";
import config from "../../../config.json";
import { usePopup } from "../../../contexts/PopupContext";
import useAxios from "../../../hooks/useAxios";
import { useLinks } from "../../../contexts/LinksContext";
import { remove } from "../../../api/links";
import { get } from "../../../api/files";

interface Props {
  id: number;
  link: Link;
}

const LinkRow: FC<Props> = ({ id, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [filename, setFilename] = useState("");

  const { refresh } = useLinks();
  const { show } = usePopup();

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
            onClick={copyToClipboard}
          >
            <CopyIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>

          <div
            className={styles.button}
            title="Удалить"
            onClick={() => sendDelete(remove(link.id))}
          >
            <DeleteIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>

          <div className={styles.button}>
            <OptionsIcon color={isHovered ? "white" : "#4676fb"} width="26" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkRow;
