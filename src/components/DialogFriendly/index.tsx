import React, { FC, ReactNode } from "react";

interface DialogFriendlyProps {
  children?: ReactNode;
  dialog?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DialogFriendly: FC<DialogFriendlyProps> = ({
  children,
  dialog,
  isOpen,
  onClose,
}) => {
  return (
    <div>
      {children}
      {isOpen && (
        <div
          className="df_parent_div"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 100,
            top: 0,
            position: "absolute",
          }}
          onClick={onClose}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "white",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {dialog}
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogFriendly;
