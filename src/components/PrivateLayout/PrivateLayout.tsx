import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";
import { PopupProvider } from "../../contexts/PopupContext";

const PrivateLayout = () => {
  return (
    <StorageProvider>
      <EntitiesProvider>
        <DialogProvider>
          <PopupProvider>
            <Outlet />
          </PopupProvider>
        </DialogProvider>
      </EntitiesProvider>
    </StorageProvider>
  );
};

export default PrivateLayout;
