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
import InputValidationError from "../../InputValidationError/InputValidationError";
import { AxiosResponse } from "axios";
import Loading from "../../Loading/Loading";

interface RowProps {
  linkId: string;
  friend: User;
  refreshLink: () => void;
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { sendRequest: sendGetFriends, loading: loadingFriends } = useAxios({
    onSuccess(response) {
      const data = response.data.users;
      const respFriends = data.map((u: any) => ({ id: u.id, name: u.name }));
      setFriends(respFriends);
    },
  });
  const { sendRequest: sendAdd, loading: loadingAdd } = useAxios({
    onSuccess(response) {
      refreshLink();
      setName("");
      setErrorMsg(null);
    },
    onError(error) {
      const response = error.response as AxiosResponse;

      if (!response) {
        console.log(error.message);
        return;
      }

      const errors = response.data.errors;

      console.log(errors);

      if (errors) setErrorMsg(errors[0].msg);
    },
  });
  const { sendRequest: sendGetLink } = useAxios({
    onSuccess(response) {
      const data = response.data.link;

      setLink({
        id: data.id,
        link: data.link,
        status: data.isPublic ? "public" : "private",
        friends: data.friends,
        fileId: data.fileInfoId,
      });

      setErrorMsg(null);
    },
  });
  const { sendRequest: sendRemoveAllFriends } = useAxios({
    onSuccess(response) {
      refreshLink();
    },
  });

  useEffect(() => {
    sendGetFriends(getByIds(link.friends));
  }, [link]);

  const handleAdd = () => sendAdd(addFriend(link.id, name));
  const refreshLink = () => sendGetLink(get(link.id));
  const handleRemoveAllFriends = () =>
    sendRemoveAllFriends(removeAllFriends(link.id));

  return (
    <DialogShell title="Список избранных">
      <div className={styles.searchAndAddButton}>
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Имя пользователя"
            value={name}
            setValue={setName}
            hasError={errorMsg !== null}
          />
          <InputValidationError error={errorMsg} />
        </div>

        <Button title="Добавить" onClick={handleAdd} loading={loadingAdd} />
      </div>

      <div className={styles.list}>
        {loadingFriends ? (
          <Loading size="large" />
        ) : (
          friends.map((f) => (
            <Row
              key={f.id}
              friend={f}
              linkId={link.id}
              refreshLink={refreshLink}
            />
          ))
        )}
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
