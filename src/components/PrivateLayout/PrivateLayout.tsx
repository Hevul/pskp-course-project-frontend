import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";
import { PopupProvider } from "../../contexts/PopupContext";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";
import { LinksProvider } from "../../contexts/LinksContext";
import { UploadProvider } from "../../contexts/UploadContext";
import { FileViewerProvider } from "../../contexts/FileViewerContext";

const PrivateLayout = () => {
  return (
    <PopupProvider>
      <ContextMenuProvider>
        <StorageProvider>
          <EntitiesProvider>
            <LinksProvider>
              <UploadProvider>
                <DialogProvider>
                  <FileViewerProvider>
                    <Outlet />
                  </FileViewerProvider>
                </DialogProvider>
              </UploadProvider>
            </LinksProvider>
          </EntitiesProvider>
        </StorageProvider>
      </ContextMenuProvider>
    </PopupProvider>
  );
};

export default PrivateLayout;
