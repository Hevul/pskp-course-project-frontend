import { FC, ReactNode, useEffect, useState } from "react";
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

type Status = "public" | "private";

interface TileProps {
  header: string;
  description: string;
  icon: ReactNode;
  tileStatus: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  status: Status | null;
  onClick: () => void;
}

const Tile: FC<TileProps> = ({
  header,
  description,
  icon,
  tileStatus,
  setStatus,
  status,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    onClick();
    setStatus(tileStatus);
  };

  const isSelected = tileStatus === status;

  return (
    <div
      className={styles.tile}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isSelected
          ? "#4676FB"
          : isHovered
          ? "#ECF5FE"
          : "white",
      }}
      onClick={handleClick}
    >
      {icon}
      <div className={styles.text}>
        <h1
          className={styles.h1}
          style={{ color: isSelected ? "white" : "#41404B" }}
        >
          {header}
        </h1>
        <h2
          className={styles.h2}
          style={{
            color: isSelected
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(65, 64, 75, 0.72)",
          }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};

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
          <Button title="Скопировать" onClick={() => console.log("copy")} />
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
