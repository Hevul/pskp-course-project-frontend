import { Outlet } from "react-router-dom";
import { PopupProvider } from "../../contexts/PopupContext";
import { DialogProvider } from "../../contexts/DialogContext";
import { FileViewerProvider } from "../../contexts/FileViewerContext";

const PublicLayout = () => {
  return (
    <PopupProvider>
      <DialogProvider>
        <FileViewerProvider>
          <Outlet />
        </FileViewerProvider>
      </DialogProvider>
    </PopupProvider>
  );
};

export default PublicLayout;
