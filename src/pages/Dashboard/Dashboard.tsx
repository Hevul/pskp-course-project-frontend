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
import useAxios from "../../hooks/useAxios";
import { useStorage } from "../../contexts/StorageContext";
import { useEntities } from "../../contexts/EntitiesContext";
import { upload } from "../../api/files";
import StorageTableTiled from "../../components/StorageTableTiled/StorageTableTiled";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const { open } = useDialog();
  const { sendRequest } = useAxios();
  const { storage } = useStorage();
  const { refresh, currentDir } = useEntities();

  const menuItems = [
    {
      title: "Создать папку",
      icon: <PlusIcon />,
      action: () =>
        open(<CreateDirDialog currentDir={currentDir} onSuccess={refresh} />),
    },
    {
      title: "Загрузить файл",
      icon: <UploadIcon width="20" />,
      action: () => handleButtonClick(),
    },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!storage) return;
    await sendRequest(upload(file, storage?.id, currentDir?.id));
    refresh();
  };

  return (
    <ProtectedRoute>
      <ContextMenuProvider>
        <Layout>
          <div className={styles.top}>
            <StorageList />
            <Search search={search} setSearch={setSearch} />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none", visibility: "collapse" }}
            onChange={handleFileChange}
            onClick={handleButtonClick}
          />

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
