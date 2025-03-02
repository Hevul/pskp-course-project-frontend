import React, { FC } from "react";
import "./PrimaryButton.css";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <h2 className="a_primary" onClick={onClick}>
      {text}
    </h2>
  );
};

export default PrimaryButton;
