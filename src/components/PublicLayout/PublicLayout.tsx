import { Outlet } from "react-router-dom";
import { PopupProvider } from "../../contexts/PopupContext";
import { DialogProvider } from "../../contexts/DialogContext";

const PublicLayout = () => {
  return (
    <PopupProvider>
      <DialogProvider>
        <Outlet />
      </DialogProvider>
    </PopupProvider>
  );
};

export default PublicLayout;
