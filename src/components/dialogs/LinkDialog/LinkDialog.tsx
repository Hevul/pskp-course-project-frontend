import { FC, useEffect, useState } from "react";
import Button from "../../Button/Button";
import PeopleIcon from "../../icons/PeopleIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import DialogShell from "../DialogShell";
import styles from "./LinkDialog.module.css";
import useAxios from "../../../hooks/useAxios";
import {
  download,
  getOrGenerate,
  remove,
  setPublicity,
} from "../../../api/links";
import File from "../../../models/File";
import { useDialog } from "../../../contexts/DialogContext";
import Link from "../../../models/Link";
import IconButton from "../../IconButton/IconButton";
import TwoUsersIcon from "../../icons/TwoUsersIcon";
import EditFriendsList from "../EditFriendsList/EditFriendsList";
import { useEntities } from "../../../contexts/EntitiesContext";
import fileDownload from "js-file-download";
import Tile from "./Tile";
import config from "../../../config.json";

type Status = "public" | "private";

interface Props {
  file: File;
}

const LinkDialog: FC<Props> = ({ file }) => {
  const [status, setStatus] = useState<Status | null>(null);
  const [link, setLink] = useState<Link | null>(null);

  const { close, open } = useDialog();
  const { refresh } = useEntities();
  const { sendRequest: sendGenerate, response: genResp } = useAxios();
  const { sendRequest: sendDelete } = useAxios();
  const { sendRequest: sendSetPublicity } = useAxios();
  const { sendRequest: sendDownload } = useAxios();

  useEffect(() => {
    const fetch = async () => {
      await sendGenerate(getOrGenerate(file.id));
      refresh();
    };

    fetch();
  }, []);

  useEffect(() => {
    if (genResp?.status === 200) {
      const {
        id,
        link,
        friends,
        fileInfoId: fileId,
        isPublic,
      } = genResp.data.link;

      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
      });

      setStatus(status);
    }
  }, [genResp]);

  const handleDelete = async () => {
    if (!link) return;

    await sendDelete(remove(link.id));
    refresh();
    close();
  };

  const copyToClipboard = () => {
    if (!link?.link) return;

    const text = `${config.base}/${config.link}/download/${link.link}`;

    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Не удалось скопировать ссылку:", err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    });
  };

  return (
    <DialogShell title="Ссылка на файл" width="500px">
      <div className={styles.tiles}>
        <Tile
          tileStatus="public"
          header="Доступно всем"
          description="Скачивать файл смогут все, у кого есть ссылка"
          icon={
            <PeopleIcon
              width="32"
              color={status === "public" ? "white" : "#41404B"}
            />
          }
          setStatus={setStatus}
          status={status}
          onClick={async () => {
            if (!link) return;
            if (link.status === "public") return;
            await sendSetPublicity(setPublicity(link.id, true));
            sendGenerate(getOrGenerate(file.id));
          }}
        />
        <Tile
          tileStatus="private"
          header="Список избранных"
          description="Скачивать файл смогут только те, кто добавлен в список избранных"
          icon={
            <ShieldIcon
              width="38"
              color={status === "private" ? "white" : "#41404B"}
            />
          }
          setStatus={setStatus}
          status={status}
          onClick={async () => {
            if (!link) return;
            if (link.status === "private") return;
            await sendSetPublicity(setPublicity(link.id, false));
            sendGenerate(getOrGenerate(file.id));
          }}
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.leftButtons}>
          <Button title="Скопировать" onClick={copyToClipboard} />
          <Button
            title="скачатъ"
            onClick={async () => {
              if (link) {
                const res = await sendDownload(download(link?.link));

                if (!res) return;

                const data = res.data;

                const contentDisposition = res.headers["content-disposition"];

                const filename = decodeFilename(contentDisposition);

                fileDownload(data, filename);
              }
            }}
          />
          <div
            style={{
              visibility: link?.status === "private" ? "visible" : "collapse",
            }}
          >
            <IconButton
              onClick={() => {
                if (link) open(<EditFriendsList refLink={link} />);
              }}
              icon={<TwoUsersIcon width="23" color="#b5c8fd" />}
            />
          </div>
        </div>

        <SecondaryButton title="Удалить" onClick={handleDelete} />
      </div>
    </DialogShell>
  );
};

function decodeFilename(header: string) {
  const utf8FilenameRegex = /filename\*=UTF-8''([^;]+)/i;
  const asciiFilenameRegex = /filename=(["']?)(.*?[^\\])\1(;|$)/i;

  let filename = "";
  if (utf8FilenameRegex.test(header)) {
    filename = decodeURIComponent(utf8FilenameRegex.exec(header)![1]);
  } else {
    const matches = asciiFilenameRegex.exec(header);
    if (matches?.[2]) {
      filename = matches[2];
    }
  }
  return filename || "file";
}

export default LinkDialog;
