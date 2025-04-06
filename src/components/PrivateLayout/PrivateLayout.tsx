import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";
import { PopupProvider } from "../../contexts/PopupContext";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";

const PrivateLayout = () => {
  return (
    <PopupProvider>
      <ContextMenuProvider>
        <StorageProvider>
          <EntitiesProvider>
            <DialogProvider>
              <Outlet />
            </DialogProvider>
          </EntitiesProvider>
        </StorageProvider>
      </ContextMenuProvider>
    </PopupProvider>
  );
};

export default PrivateLayout;
