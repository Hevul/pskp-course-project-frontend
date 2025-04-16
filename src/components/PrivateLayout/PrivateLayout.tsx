import { Outlet } from "react-router-dom";
import { DialogProvider } from "../../contexts/DialogContext";
import { EntitiesProvider } from "../../contexts/EntitiesContext";
import { StorageProvider } from "../../contexts/StorageContext";
import { PopupProvider } from "../../contexts/PopupContext";
import { ContextMenuProvider } from "../../contexts/ContextMenuContext";
import { LinksProvider } from "../../contexts/LinksContext";

const PrivateLayout = () => {
  return (
    <PopupProvider>
      <ContextMenuProvider>
        <StorageProvider>
          <EntitiesProvider>
            <LinksProvider>
              <DialogProvider>
                <Outlet />
              </DialogProvider>
            </LinksProvider>
          </EntitiesProvider>
        </StorageProvider>
      </ContextMenuProvider>
    </PopupProvider>
  );
};

export default PrivateLayout;
