import styles from "./Storage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import { useState } from "react";
import Button from "../../components/Button/Button";
import PlusIcon from "../../components/icons/PlusIcon";
import CloudShell from "../../components/CloudShell/CloudShell";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";

const Storage = () => {
  const [storageName, setStorageName] = useState("");

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <CloudShell header="Создание хранилища">
          <div className={styles.inputDiv}>
            <InputWithLabel
              label="Название:"
              placeholder="Название хранилища"
              value={storageName}
              setValue={setStorageName}
            />
          </div>
          <div className={styles.right}>
            <Button title="Создать" onClick={() => {}} icon={<PlusIcon />} />
          </div>
        </CloudShell>
        <CloudShell header="Переименование хранилища">
          <div className={styles.inputDiv}>
            <InputWithLabel
              label="Новое название:"
              placeholder="Название хранилища"
              value={storageName}
              setValue={setStorageName}
            />
          </div>
          <div className={styles.right}>
            <Button
              title="Изменить"
              onClick={() => {}}
              icon={<EditIcon width="13" height="13" />}
            />
          </div>
        </CloudShell>
        <CloudShell header="Удаление хранилища">
          <p className={styles.p}>
            Вы правда хотите удалить хранилище со всеми файлами?
          </p>
          <div className={styles.right}>
            <Button
              color="#FF0000"
              title="Удалить"
              onClick={() => {}}
              icon={<DeleteIcon width="13" height="13" />}
            />
          </div>
        </CloudShell>
      </div>
    </div>
  );
};

export default Storage;
