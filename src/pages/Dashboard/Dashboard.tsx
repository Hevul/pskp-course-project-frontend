import { useRef, useState } from "react";
import styles from "./Dashboard.module.css";
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
import { UploadProvider } from "../../contexts/UploadContext";
import UploadsMenu from "../../components/UploadsMenu/UploadsMenu";
import { usePopup } from "../../contexts/PopupContext";

const Dashboard = () => {
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

  const { show } = usePopup();

  const handleClick = () => {
    show("Это тестовое уведомление!");
  };

  return (
    <ProtectedRoute>
      <ContextMenuProvider>
        <UploadProvider>
          <Layout>
            <div className={styles.top}>
              <StorageList />

              <button onClick={handleClick}>Показать уведомление</button>
            </div>

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

            <FileUploader ref={fileUploaderRef} />
            <UploadsMenu />
          </Layout>
        </UploadProvider>
      </ContextMenuProvider>
    </ProtectedRoute>
  );
};

export default Dashboard;
