import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";
import { PopupProvider } from "../../contexts/PopupContext";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";
import { LinksProvider } from "../../contexts/LinksContext";
import { UploadProvider } from "../../contexts/UploadContext";

const PrivateLayout = () => {
  return (
    <PopupProvider>
      <ContextMenuProvider>
        <StorageProvider>
          <EntitiesProvider>
            <LinksProvider>
              <UploadProvider>
                <DialogProvider>
                  <Outlet />
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
