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
import { useDialog } from "../../../contexts/DialogContext";
import { useLinks } from "../../../contexts/LinksContext";

interface Props {
  refLink: Link;
}

const EditLinkDialog: FC<Props> = ({ refLink }) => {
  const [link, setLink] = useState<Link>(refLink);
  const [name, setName] = useState(refLink.name || "");
  const [description, setDescription] = useState(refLink.description || "");
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const { show } = usePopup();
  const { close } = useDialog();
  const { refresh } = useLinks();

  const { sendRequest: sendUpdate } = useAxios({
    onSuccess(response) {
      show("Название и описание ссылки успешно обновлены!", {
        iconType: "success",
      });
      setLink((prev) => ({ ...prev, name, description }));
      close();
      refresh();
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const nameErrorObj = errors.find((err: any) => err.path === "name");
        setNameError(nameErrorObj?.msg || null);

        const descriptionErrorObj = errors.find(
          (err: any) => err.path === "description"
        );
        setDescriptionError(descriptionErrorObj?.msg || null);
      }
    },
  });

  const { sendRequest: sendGet } = useAxios({
    onSuccess(response) {
      const {
        id,
        link: linkUrl,
        friends,
        fileInfoId: fileId,
        isPublic,
        _name,
        _description,
        filename,
      } = response.data.link;

      const updatedName = _name || "";
      const updatedDescription = _description || "";
      const status = isPublic ? "public" : "private";

      setLink({
        id,
        link: linkUrl,
        status,
        friends,
        fileId,
        filename,
        name: updatedName,
        description: updatedDescription,
      });

      setName(updatedName);
      setDescription(updatedDescription);
      setNameError(null);
      setDescriptionError(null);
    },
  });

  const handleUpdate = () => {
    if (!name.trim()) {
      setNameError("Название не может быть пустым");
      return;
    }
    sendUpdate(updateNameAndDescription(link.id, name, description));
  };

  useEffect(() => {
    sendGet(get(link.id));
  }, [link.id]);

  return (
    <DialogShell title="Редактирование ссылки">
      <div>
        <Input
          label="Укажите название:"
          placeholder="Название ссылки"
          value={name}
          setValue={setName}
          hasError={!!nameError}
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
          hasError={!!descriptionError}
        />
        <InputValidationError error={descriptionError} />
      </div>

      <div className={styles.buttons}>
        <Button title="Сохранить" onClick={handleUpdate} />
      </div>
    </DialogShell>
  );
};

export default EditLinkDialog;
