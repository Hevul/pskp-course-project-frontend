import { FC, useEffect, useState } from "react";
import Button from "../../Button/Button";
import PeopleIcon from "../../icons/PeopleIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import DialogShell from "../DialogShell";
import styles from "./LinkDialog.module.css";
import useAxios from "../../../hooks/useAxios";
import {
  create,
  getByFileInfoId,
  remove,
  setPublicity,
} from "../../../api/link";
import File from "../../../models/File";
import { useDialog } from "../../../contexts/DialogContext";
import Link from "../../../models/Link";
import IconButton from "../../IconButton/IconButton";
import TwoUsersIcon from "../../icons/TwoUsersIcon";
import EditFriendsList from "../EditFriendsList/EditFriendsList";
import { useEntities } from "../../../contexts/EntitiesContext";
import Tile from "./Tile";
import config from "../../../config.json";
import { usePopup } from "../../../contexts/PopupContext";
import { useLinks } from "../../../contexts/LinksContext";
import EditIcon from "../../icons/EditIcon";
import EditLinkDialog from "../EditLinkDialog/EditLinkDialog";

type Status = "public" | "private";

interface Props {
  fileId: string;
}

const LinkDialog: FC<Props> = ({ fileId }) => {
  const [status, setStatus] = useState<Status | null>(null);
  const [link, setLink] = useState<Link | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { close, open } = useDialog();
  const { refresh } = useEntities();
  const { show } = usePopup();
  const { refresh: refreshLinks } = useLinks();

  const { sendRequest: sendCreate } = useAxios({
    onSuccess(response) {
      const {
        id,
        link,
        friends,
        fileInfoId: fileId,
        isPublic,
        filename,
      } = response.data.link;

      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
        filename,
      });

      setStatus(status);

      refresh();
    },
  });
  const { sendRequest: sendGet } = useAxios({
    onSuccess(response) {
      const {
        id,
        link,
        friends,
        fileInfoId: fileId,
        isPublic,
        filename,
      } = response.data.link;

      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
        filename,
      });

      setStatus(status);
    },
    onError(error) {
      if (error?.response.status === 404) {
        sendCreate(create(fileId));
      } else {
        console.log(error.message);
      }
    },
  });

  const { sendRequest: sendDelete } = useAxios({
    onSuccess(response) {
      if (response.status === 200) {
        show(`Ссылка удалена!`, { iconType: "success" });
        refresh();
        refreshLinks();
        close();
      }
    },
  });
  const { sendRequest: sendSetPublicity } = useAxios({
    onSuccess(response) {
      if (response.status === 200) {
        show(
          `Ссылка теперь ${
            link?.status === "public" ? "приватная" : "публичная"
          }!`,
          { iconType: "success" }
        );
        refreshLinks();
      }
    },
  });

  useEffect(() => {
    sendGet(getByFileInfoId(fileId));
  }, []);

  const copyToClipboard = () => {
    if (!link?.link || isButtonDisabled) return;

    const text = `${config.client}/link/${link.link}`;

    if (!navigator.clipboard) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      show("Ссылка скопирована в буфер обмена!", { iconType: "success" });
    } catch (err) {
      console.error("Не удалось скопировать ссылку:", err);
      show("Не удалось скопировать ссылку", { iconType: "error" });
    } finally {
      document.body.removeChild(textArea);
    }
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    show("Ссылка скопирована в буфер обмена!", { iconType: "success" });
  }).catch((err) => {
    console.error("Не удалось скопировать ссылку:", err);
    show("Не удалось скопировать ссылку", { iconType: "error" });
  });

  setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  const handleDelete = async () => {
    if (!link) return;
    sendDelete(remove(link.id));
  };

  const handleToggleStatus = async (status: Status) => {
    if (!link) return;
    if (link.status === status) return;
    await sendSetPublicity(setPublicity(link.id, status === "public"));
    sendGet(getByFileInfoId(fileId));
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
          onClick={() => handleToggleStatus("public")}
        />
        <Tile
          tileStatus="private"
          header="Список доверенных"
          description="Скачивать файл смогут только те, кто добавлен в список доверенных"
          icon={
            <ShieldIcon
              width="38"
              color={status === "private" ? "white" : "#41404B"}
            />
          }
          setStatus={setStatus}
          status={status}
          onClick={() => handleToggleStatus("private")}
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.leftButtons}>
          <Button
            title="Скопировать"
            onClick={copyToClipboard}
            loading={isButtonDisabled}
          />

          <IconButton
            onClick={() => {
              if (link) open(<EditLinkDialog refLink={link} />);
            }}
            icon={<EditIcon width="23" color="#b5c8fd" />}
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

export default LinkDialog;
