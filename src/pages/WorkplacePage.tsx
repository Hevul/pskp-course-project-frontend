import { useEffect, useState } from "react";
import "../styles/workplacePage.css";
import DialogFriendly from "../components/DialogFriendly";
import useDialog from "../hooks/useDialog";
import CreateStorageDialog from "../components/dialogs/CreateStorageDialog";
import SelectStorageDialog from "../components/dialogs/SelectStorageDialog";
import PrimaryButton from "../components/PrimaryButton";
import ProtectedRoute from "../components/ProtectedRoute";
import UploadFileDialog from "../components/dialogs/UploadFileDialog";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../contexts/StorageContext";
import { get } from "../api/users";
import { getAllByStorageId } from "../api/files";
import useAxios from "../hooks/useAxios";

interface FileData {
  id: string;
  name: string;
  size: string;
  uploadAt: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day} ${year}`;
};

const parseFilesResponse = (filesResponse: any): FileData[] => {
  return filesResponse.data.files.map((f: any) => ({
    id: f.id,
    name: f._name,
    size: f.size,
    uploadAt: formatDate(f.uploadAt),
  }));
};

const WorkplacePage = () => {
  const { dialog, open, close, isOpen } = useDialog();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { storage } = useStorage();
  const [files, setFiles] = useState<FileData[]>([]);

  const { response: user, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest(get());
  }, []);

  const { response: filesResponse, sendRequest: fetchFiles } = useAxios();

  useEffect(() => {
    if (storage) fetchFiles(getAllByStorageId(storage.id));
  }, [storage]);

  useEffect(() => {
    if (filesResponse) {
      const filesData = parseFilesResponse(filesResponse);
      setFiles(filesData);
    }
  }, [filesResponse]);

  return (
    <ProtectedRoute>
      <DialogFriendly dialog={dialog} isOpen={isOpen} onClose={close}>
        <div className="workplace">
          <div className="workplace_area">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>size</th>
                  <th>upload at</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.uploadAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="instrument_area">
            <div className="commands">
              <PrimaryButton
                text="Select storage"
                onClick={() =>
                  open(<SelectStorageDialog closeDialog={close} />)
                }
              />
              <PrimaryButton
                text="Create storage"
                onClick={() =>
                  open(<CreateStorageDialog closeDialog={close} />)
                }
              />
              <PrimaryButton
                text="Upload"
                onClick={() =>
                  open(<UploadFileDialog onSecondaryClick={close} />)
                }
              />
            </div>
            <div className="info">
              <div>Hello {user?.data.login}</div>
              <div>Current storage: {storage?.name}</div>
              <PrimaryButton
                text="Log out"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              />
            </div>
          </div>
        </div>
      </DialogFriendly>
    </ProtectedRoute>
  );
};

export default WorkplacePage;
