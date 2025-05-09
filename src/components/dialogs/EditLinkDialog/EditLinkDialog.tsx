import { FC, useEffect, useState } from "react";
import Link from "../../../models/Link";
import DialogShell from "../DialogShell";
import Input from "../../Input/Input";
import styles from "./EditLinkDialog.module.css";
import Textarea from "../../Textarea/Textarea";
import Button from "../../Button/Button";
import useAxios from "../../../hooks/useAxios";
import { get, updateNameAndDescription } from "../../../api/link";
import { usePopup } from "../../../contexts/PopupContext";
import InputValidationError from "../../InputValidationError/InputValidationError";

interface Props {
  refLink: Link;
}

const EditLinkDialog: FC<Props> = ({ refLink }) => {
  const [link, setLink] = useState<Link>(refLink);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { show } = usePopup();

  let nameError: string | null = null;
  let descriptionError: string | null = null;

  const { sendRequest: sendUpdate } = useAxios({
    onSuccess(response) {
      show("Название и описание ссылки успешно обновлены!", {
        iconType: "success",
      });
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const nameErrorObj = errors.find((err: any) => err.path === "name");
        nameError = nameErrorObj;

        const descriptionErrorObj = errors.find(
          (err: any) => err.path === "description"
        );
        descriptionError = descriptionErrorObj;
      }
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
        _name,
        _description,
        filename,
      } = response.data.link;

      const name = _name;
      const description = _description;
      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link,
        status,
        friends,
        fileId,
        filename,
        name,
        description,
      });

      setName(name);
      setDescription(description);
    },
  });

  const handleUpdate = () =>
    sendUpdate(updateNameAndDescription(link.id, name, description));

  useEffect(() => {
    sendGet(get(link.id));
  }, []);

  return (
    <DialogShell title="Редактирование ссылки">
      <div>
        <Input
          label="Укажите название:"
          placeholder={"Название ссылки"}
          value={name}
          setValue={setName}
          hasError={nameError !== null}
        />
        <InputValidationError error={nameError} />
      </div>

      <div>
        <Textarea
          label="Укажите описание:"
          placeholder="Описание ссылки"
          value={description}
          setValue={setDescription}
          maxLength={1024}
          hasError={descriptionError !== null}
        />
        <InputValidationError error={descriptionError} />
      </div>

      <div className={styles.buttons}>
        <Button title={"Сохранить"} onClick={handleUpdate} />
      </div>
    </DialogShell>
  );
};

export default EditLinkDialog;
