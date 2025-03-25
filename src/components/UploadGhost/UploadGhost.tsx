import { FC, forwardRef } from "react";
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { upload } from "../../api/files";

interface Props {
  ref: React.RefObject<HTMLInputElement | null>;
}

const UploadGhost: FC<Props> = ({ ref }) => {
  const { sendRequest } = useAxios();
  const { storage } = useStorage();
  const { refresh, currentDir } = useEntities();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File | null) => {
    if (!file) return;
    if (!storage) return;

    await sendRequest(upload(file, storage?.id, currentDir?.id));

    refresh();
  };

  return (
    <input
      type="file"
      ref={ref}
      style={{ display: "none", visibility: "collapse" }}
      onChange={handleFileChange}
    />
  );
};

export default UploadGhost;
