import React, { FC, ReactNode } from "react";
import "./Dialog.css";

interface DialogProps {
  title?: string;
  children?: ReactNode;
}

const Dialog: FC<DialogProps> = ({ title, children }) => {
  return (
    <div className="dialog_container">
      <div className="dialog_border">
        <div className="h1_container">
          <h1 className="dialog_h1">{title}</h1>
        </div>
        <div style={{ marginTop: 30, paddingBottom: 30, marginLeft: 40 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
