import { FC, useState } from "react";
import Storage from "../../../models/Storage";
import DialogShell from "../DialogShell";
import styles from "./DeleteStorageDialog.module.css";
import Button from "../../Button/Button";
import useAxios from "../../../hooks/useAxios";
import { remove } from "../../../api/storages";
import { useDialog } from "../../../contexts/DialogContext";
import { usePopup } from "../../../contexts/PopupContext";

interface Props {
  storage: Storage;
  onSuccess?: () => void;
}

const DeleteStorageDialog: FC<Props> = ({ storage, onSuccess }) => {
  const { id, name } = storage;

  const { close } = useDialog();
  const { show } = usePopup();

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      if (response.status === 200) {
        show(`Хранилище ${name} удалено!`, { iconType: "success" });
        close();
        onSuccess?.();
      }
    },
    onError(error) {
      show(`Не удалось удалить хранилище!`, { iconType: "error" });
    },
  });

  const handleDelete = () => {
    sendRequest(remove(id));
  };

  return (
    <DialogShell title={`Вы правда хотите удалить хранилище ${name}?`}>
      <h1 className={styles.h1}>
        Вместе с хранилищем будут удалены все его файлы и папки! Удалённое
        хранилище нельзу будет восстановить.
      </h1>

      <div className={styles.buttons}>
        <Button
          title="Удалить"
          onClick={handleDelete}
          color="#FF3030"
          loading={loading}
        />
      </div>
    </DialogShell>
  );
};

export default DeleteStorageDialog;
