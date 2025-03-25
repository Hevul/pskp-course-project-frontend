import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";

const PrivateLayout = () => {
  return (
    <StorageProvider>
      <EntitiesProvider>
        <DialogProvider>
          <Outlet />
        </DialogProvider>
      </EntitiesProvider>
    </StorageProvider>
  );
};

export default PrivateLayout;
