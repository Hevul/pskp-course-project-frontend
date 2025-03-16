import styles from "./StorageTable.module.css";
import StorageTableRow from "../StorageTableRow/StorageTableRow";

const StorageTable = () => {
  return (
    <table className={styles.table}>
      {/* <colgroup>
        <col style={{ width: "5%" }} />
        <col style={{ width: "" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "5%" }} />
      </colgroup> */}
      <thead>
        <tr>
          <th></th>
          <th className={styles.leftTh}>Название</th>
          <th className={styles.leftTh}>Размер</th>
          <th className={styles.leftTh}>Дата создания</th>
          <th>Скачать</th>
          <th>Переименовать</th>
          <th>Удалить</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <StorageTableRow
          id="1"
          type="folder"
          name="Директорий"
          size={100}
          date={new Date()}
        />
        <StorageTableRow
          id="2"
          type="file"
          name="Файл"
          size={100}
          date={new Date()}
        />
      </tbody>
    </table>
  );
};

export default StorageTable;
