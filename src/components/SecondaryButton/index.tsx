import React, { FC } from "react";
import "./SecondaryButton.css";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, onClick }) => {
  return (
    <h2 className="a_secondary" onClick={onClick}>
      {text}
    </h2>
  );
};

export default SecondaryButton;
