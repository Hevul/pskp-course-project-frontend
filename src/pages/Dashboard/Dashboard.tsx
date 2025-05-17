import styles from "./Dashboard.module.css";
import { useEffect, useRef } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import StorageList from "./components/StorageList/StorageList";
import ContextMenuArea from "../../components/ContextMenuArea/ContextMenuArea";
import PlusIcon from "../../components/icons/PlusIcon";
import { useDialog } from "../../contexts/DialogContext";
import CreateDirDialog from "../../components/dialogs/CreateDirDialog/CreateDirDialog";
import UploadIcon from "../../components/icons/UploadIcon";
import Path from "../../components/Path/Path";
import { useEntities } from "../../contexts/EntitiesContext";
import StorageTableTiled from "./components/StorageTableTiled/StorageTableTiled";
import { UploadProvider } from "../../contexts/UploadContext";
import UploadsMenu from "./components/UploadsMenu/UploadsMenu";
import Loading from "../../components/Loading/Loading";
import Layout from "../Layout/Layout";
import FileUploader, {
  FileUploaderRef,
} from "./components/FileUploader/FileUploader";

const Dashboard = () => {
  const { open } = useDialog();
  const { refresh, currentDir, isLoading } = useEntities();
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
      <Layout>
        <div className={styles.top}>
          <StorageList />
        </div>

        <ContextMenuArea items={menuItems}>
          <div className={styles.center}>
            <div style={{ marginBottom: "36px" }}>
              <Path />
            </div>

            <div className={styles.storageTable}>
              {isLoading ? <Loading size="large" /> : <StorageTableTiled />}
            </div>
          </div>
        </ContextMenuArea>

        <FileUploader ref={fileUploaderRef} />
        <UploadsMenu />
      </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
