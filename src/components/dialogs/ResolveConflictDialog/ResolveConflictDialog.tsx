import styles from "./ResolveConflictDialog.module.css";
import { FC } from "react";
import Button from "../../Button/Button";
import DialogShell from "../DialogShell";
import { FileUpload, useUploads } from "../../../contexts/UploadContext";
import useAxios from "../../../hooks/useAxios";
import { confirmOverwrite } from "../../../api/file";
import { usePopup } from "../../../contexts/PopupContext";
import SecondaryButton from "../../SecondaryButton/SecondaryButton";
import { useDialog } from "../../../contexts/DialogContext";
import { useEntities } from "../../../contexts/EntitiesContext";

interface Props {
  upload: FileUpload;
}

const ResolveConflictDialog: FC<Props> = ({ upload }) => {
  const { id, filename } = upload;

  const { removeUpload, getUpload, completeUpload, failUpload } = useUploads();
  const { refresh } = useEntities();
  const { show } = usePopup();
  const { close } = useDialog();

  const { sendRequest: sendOverwrite, loading } = useAxios({
    onSuccess(response) {
      show(`Файл ${filename} успешно перезаписан!`, {
        iconType: "success",
      });
      completeUpload(id);
      refresh();
      close();
    },
    onError(error) {
      show(`Не удалось перезаписать файл ${filename}!`, {
        iconType: "error",
      });
      failUpload(id, "");
      close();
    },
  });

  const handleRemove = () => {
    removeUpload(upload.id);
    show(`Загрузка файла ${filename} успешно отменена!`, {
      iconType: "success",
    });
    close();
  };
  const handleOverwrite = () => {
    const upload = getUpload(id);
    if (upload) {
      const { tempFileId, existingFileId } = upload;

      if (tempFileId && existingFileId) {
        sendOverwrite(confirmOverwrite(tempFileId, existingFileId));
        show(`Файл ${filename} будет перезаписан.`, { iconType: "info" });
      }
    }
  };

  return (
    <DialogShell title={`Разрешение конфликта для файла '${filename}'`}>
      <div className={styles.buttons}>
        <SecondaryButton title={"Отменить загрузку"} onClick={handleRemove} />
        <Button
          loading={loading}
          title={"Перезаписать файл"}
          onClick={handleOverwrite}
        />
      </div>
    </DialogShell>
  );
};

export default ResolveConflictDialog;
