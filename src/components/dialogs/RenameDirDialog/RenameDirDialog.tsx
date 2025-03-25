import { FC, useEffect, useState } from "react";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import DialogShell from "../DialogShell";
import { useDialog } from "../../../contexts/DialogContext";
import styles from "./RenameDirDialog.module.css";
import Button from "../../Button/Button";
import { useEntities } from "../../../contexts/EntitiesContext";
import useAxios from "../../../hooks/useAxios";
import { rename } from "../../../api/dirs";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import EditIcon from "../../icons/EditIcon";
import InputValidationError from "../../InputValidationError/InputValidationError";

interface Props {
  oldName: string;
  id: string;
}

const RenameDirDialog: FC<Props> = ({ id, oldName }) => {
  const [name, setName] = useState(oldName);

  const { close } = useDialog();
  const { refresh } = useEntities();
  const { response, sendRequest, error } = useAxios();

  const handleRename = async () => {
    sendRequest(rename(id, name));
  };

  useEffect(() => {
    if (response?.status === 200) {
      close();
      refresh();
    }
  }, [response]);

  let renameError: string | null = null;

  if (error) {
    const errors = error?.response?.data?.errors;

    if (errors) {
      const errorObj = errors[0];
      if (errorObj) renameError = errorObj.msg;
    }
  }

  return (
    <DialogShell title="Переименование папки">
      <div>
        <InputWithLabel
          label="Новое название:"
          placeholder={""}
          value={name}
          setValue={setName}
        />
        <InputValidationError error={renameError} />
      </div>

      <div className={styles.buttons}>
        <SecondaryButton title="Отмена" onClick={close} />
        <Button
          title="Переименовать"
          onClick={handleRename}
          icon={<EditIcon width="14" />}
        />
      </div>
    </DialogShell>
  );
};

export default RenameDirDialog;
