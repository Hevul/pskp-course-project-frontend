import { FC, SetStateAction, useEffect, useState } from "react";
import DialogShell from "../DialogShell";
import styles from "./EditFriendsList.module.css";
import Link from "../../../models/Link";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import useAxios from "../../../hooks/useAxios";
import PersonIcon from "../../icons/PersonIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import LockIcon from "../../icons/LockIcon";
import { addFriend, get } from "../../../api/links";
import { removeFriend } from "../../../api/links";
import { removeAllFriends } from "../../../api/links";
import User from "../../../models/User";
import { getByIds } from "../../../api/users";

interface RowProps {
  linkId: string;
  friend: User;
  refreshLink: () => Promise<void>;
}

const Row: FC<RowProps> = ({ linkId, friend, refreshLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredButton, setIsHoveredButton] = useState(false);

  const { sendRequest: sendRemove } = useAxios();

  const removeHandler = async () => {
    const response = await sendRemove(removeFriend(linkId, friend.id));
    if (response) refreshLink();
  };

  return (
    <div
      className={styles.row}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? "#ECF5FE" : "white",
      }}
    >
      <div className={styles.iconAndName}>
        <PersonIcon color="#4676FB" />
        <h1 className={styles.h1}>{friend.name}</h1>
      </div>

      <div
        onClick={removeHandler}
        onMouseOver={() => setIsHoveredButton(true)}
        onMouseOut={() => setIsHoveredButton(false)}
        className={styles.iconButton}
        style={{ visibility: isHovered ? "visible" : "collapse" }}
      >
        <DeleteIcon
          color={isHoveredButton ? "#4676FB" : "rgba(70, 118, 251, 0.4)"}
        />
      </div>
    </div>
  );
};

interface Props {
  refLink: Link;
}

const EditFriendsList: FC<Props> = ({ refLink }) => {
  const [link, setLink] = useState<Link>(refLink);
  const [name, setName] = useState("");
  const [friends, setFriends] = useState<User[]>([]);

  const { sendRequest: sendGetFriends } = useAxios();
  const { sendRequest: sendAdd } = useAxios();
  const { sendRequest: sendGetLink } = useAxios();
  const { sendRequest: sendRemoveAllFriends } = useAxios();

  useEffect(() => {
    const fetch = async () => {
      const response = await sendGetFriends(getByIds(link.friends));

      if (!response) return;

      const data = response.data.users;

      const respFriends = data.map((u: any) => ({ id: u.id, name: u.name }));

      setFriends(respFriends);
    };

    fetch();
  }, [link]);

  const handleAdd = async () => {
    const response = await sendAdd(addFriend(link.id, name));
    if (response) refreshLink();
    setName("");
  };

  const refreshLink = async () => {
    const response = await sendGetLink(get(link.id));

    if (!response) return;

    const data = response.data.link;

    setLink({
      id: data.id,
      link: data.link,
      status: data.isPublic ? "public" : "private",
      friends: data.friends,
      fileId: data.fileInfoId,
    });
  };

  const handleRemoveAllFriends = async () => {
    await sendRemoveAllFriends(removeAllFriends(link.id));
    refreshLink();
  };

  return (
    <DialogShell title="Список избранных">
      <div className={styles.searchAndAddButton}>
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Имя пользователя"
            value={name}
            setValue={setName}
          />
        </div>

        <Button title="Добавить" onClick={handleAdd} />
      </div>

      <div className={styles.list}>
        {friends.map((f) => (
          <Row
            key={f.id}
            friend={f}
            linkId={link.id}
            refreshLink={refreshLink}
          />
        ))}
      </div>

      <div className={styles.rightButton}>
        <SecondaryButton
          title="Закрыть всем доступ"
          onClick={handleRemoveAllFriends}
          icon={<LockIcon />}
        />
      </div>
    </DialogShell>
  );
};

export default EditFriendsList;
