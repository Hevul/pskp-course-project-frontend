import { useState } from "react";
import ComboBox from "../ComboBox/ComboBox";
import styles from "./UploadPanel.module.css";
import { upload } from "../../api/files";
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";
import ChooseFileArea from "../ChooseFileArea/ChooseFileArea";
import { useEntities } from "../../contexts/EntitiesContext";

const UploadPanel = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { sendRequest } = useAxios();
  const { storage } = useStorage();
  const { refresh, currentDir } = useEntities();

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    if (!storage) return;

    await sendRequest(upload(selectedFile, storage?.id, currentDir?.id));

    setSelectedFile(null);
    refresh();
  };

  return (
    <div className={styles.bottom}>
      <div className={styles.chooseDir}>
        <h1 className={styles.uplH1}>Загрузить файл в хранилище</h1>
        <div>
          <p className={styles.dirChooseP}>Выберите директорий:</p>

          <ComboBox options={[]} value={null} setValue={() => {}} />
        </div>
      </div>

      <div className={styles.bottomCenter}>
        <ChooseFileArea
          setFile={setSelectedFile}
          isFileSelected={selectedFile !== null}
        />

        {selectedFile ? (
          <div className={styles.fileUplInfoDiv}>
            <img className={styles.fileImg} src="file.svg" alt="" />

            <div className={styles.fileNameSizeStatusDiv}>
              <div className={styles.fileNameAndSizeDiv}>
                <p className={styles.fileInfoP}>
                  {selectedFile ? selectedFile.name : ""}
                </p>
                <p className={styles.fileInfoP}>
                  {selectedFile ? `${selectedFile.size} Bytes` : ""}
                </p>
              </div>

              <div className={styles.fileUplStatus}></div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.uploadButtons}>
        <button
          className={styles.cancelButton}
          onClick={() => setSelectedFile(null)}
        >
          Отменить
        </button>
        <button className={styles.uplButton} onClick={handleUploadFile}>
          <img src="Plus.svg" alt="" />
          Загрузить
        </button>
      </div>
    </div>
  );
};

export default UploadPanel;
