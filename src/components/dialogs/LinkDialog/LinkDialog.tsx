import { FC, useEffect, useState } from "react";
import Button from "../../Button/Button";
import PeopleIcon from "../../icons/PeopleIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import DialogShell from "../DialogShell";
import styles from "./LinkDialog.module.css";
import useAxios from "../../../hooks/useAxios";
import { getOrGenerate, remove, setPublicity } from "../../../api/links";
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

type Status = "public" | "private";

interface Props {
  file: File;
}

const LinkDialog: FC<Props> = ({ file }) => {
  const [status, setStatus] = useState<Status | null>(null);
  const [link, setLink] = useState<Link | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { close, open } = useDialog();
  const { refresh } = useEntities();
  const { show } = usePopup();
  const { refresh: refreshLinks } = useLinks();

  const { sendRequest: sendGenerate } = useAxios({
    onSuccess(response) {
      if (response.status === 200) {
        const {
          id,
          link,
          friends,
          fileInfoId: fileId,
          isPublic,
        } = response.data.link;

        const status = isPublic ? "public" : "private";

        setLink({
          id,
          link,
          status,
          friends,
          fileId,
        });

        setStatus(status);
        refreshLinks();
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
    const fetch = async () => {
      await sendGenerate(getOrGenerate(file.id));
      refresh();
    };
    fetch();
  }, []);

  const copyToClipboard = () => {
    if (!link?.link || isButtonDisabled) return;

    const text = `${config.base}/link/${link.link}`;

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
    sendGenerate(getOrGenerate(file.id));
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
