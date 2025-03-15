import { useState } from "react";
import styles from "./Dashboard.module.css";
import StorageButton from "../../components/StorageButton/StorageButton";
import Search from "../../components/Search/Search";
import Navbar from "../../components/Navbar/Navbar";
import ComboBox from "../../components/ComboBox/ComboBox";
import StorageTable from "../../components/StorageTable/StorageTable";

const Dashboard = () => {
  const storages = [
    { id: "1", name: "Storage 1" },
    { id: "2", name: "Storage 2" },
    { id: "3", name: "Storage 3" },
  ];

  const [search, setSearch] = useState("");

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.storages}>
            {storages.map((s) => (
              <StorageButton key={s.id} id={s.id} name={s.name} />
            ))}
          </div>

          <Search search={search} setSearch={setSearch} />
        </div>

        <div className={styles.center}>
          <h1 className={styles.path}>Storage 1</h1>

          <div style={{ marginLeft: 40 }}>
            <StorageTable />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.chooseDir}>
            <h1 className={styles.uplH1}>Загрузить файл в хранилище</h1>
            <div>
              <p className={styles.dirChooseP}>Выберите директорий:</p>

              <ComboBox />
            </div>
          </div>

          <div className={styles.bottomCenter}>
            <div className={styles.uploadFile}>
              <img className={styles.cloudImg} src="upload-cloud.svg" alt="" />

              <div>
                <p className={styles.uplP}>
                  Выберите файл или перетащите его сюда
                </p>
                <p className={styles.uplAddP}>
                  Вы также можете выбрать несколько файлов
                </p>
              </div>

              <button className={styles.uplChooseFileButton}>
                ВЫБРАТЬ ФАЙЛ
              </button>
            </div>

            <div className={styles.fileUplInfoDiv}>
              <img className={styles.fileImg} src="file.svg" alt="" />

              <div className={styles.fileNameSizeStatusDiv}>
                <div className={styles.fileNameAndSizeDiv}>
                  <p className={styles.fileInfoP}>demo_image.jpg</p>
                  <p className={styles.fileInfoP}>5.7MB</p>
                </div>

                <div className={styles.fileUplStatus}></div>
              </div>
            </div>
          </div>

          <div className={styles.uploadButtons}>
            <button className={styles.cancelButton}>Отменить</button>
            <button className={styles.uplButton}>
              <img src="Plus.svg" alt="" />
              Загрузить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
