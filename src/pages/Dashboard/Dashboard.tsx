import { useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import Search from "../../components/Search/Search";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import StorageList from "../../components/StorageList/StorageList";
import Layout from "../../components/Layout/Layout";
import ContextMenuArea from "../../components/ContextMenuArea/ContextMenuArea";
import PlusIcon from "../../components/icons/PlusIcon";
import { useDialog } from "../../contexts/DialogContext";
import CreateDirDialog from "../../components/dialogs/CreateDirDialog/CreateDirDialog";
import UploadIcon from "../../components/icons/UploadIcon";
import Path from "../../components/Path/Path";
import { useEntities } from "../../contexts/EntitiesContext";
import StorageTableTiled from "../../components/StorageTableTiled/StorageTableTiled";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";
import FileUploader, {
  FileUploaderRef,
} from "../../components/FileUploader/FileUploader";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const { open } = useDialog();
  const { refresh, currentDir } = useEntities();
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  const menuItems = [
    {
      title: "Создать папку",
      icon: <PlusIcon />,
      action: () =>
        open(<CreateDirDialog currentDir={currentDir} onSuccess={refresh} />),
    },
    {
      title: "Загрузить файлы",
      icon: <UploadIcon width="20" />,
      action: () => fileUploaderRef.current?.triggerFileDialog(),
    },
  ];

  return (
    <ProtectedRoute>
      <ContextMenuProvider>
        <Layout>
          <div className={styles.top}>
            <StorageList />
            {/* <Search search={search} setSearch={setSearch} /> */}
          </div>

          <FileUploader ref={fileUploaderRef} />

          <ContextMenuArea items={menuItems}>
            <div className={styles.center}>
              <div style={{ marginBottom: "36px" }}>
                <Path />
              </div>

              <div className={styles.storageTable}>
                <StorageTableTiled />
              </div>
            </div>
          </ContextMenuArea>
        </Layout>
      </ContextMenuProvider>
    </ProtectedRoute>
  );
};

export default Dashboard;
