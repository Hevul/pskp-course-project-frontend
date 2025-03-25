import styles from "./StorageTableRowed.module.css";
import StorageTableRow from "../StorageTableRow/StorageTableRow";
import { useEntities } from "../../contexts/EntitiesContext";

const StorageTableRowed = () => {
  const { entities } = useEntities();

  const sortedEntities = [...entities].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <table className={styles.table}>
      <colgroup>
        <col style={{ width: "5%" }} />
        <col style={{ width: "" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "7%" }} />
      </colgroup>
      <tbody>
        {sortedEntities.map((e) => (
          <StorageTableRow key={e.id} entity={e} />
        ))}
      </tbody>
    </table>
  );
};

export default StorageTableRowed;
