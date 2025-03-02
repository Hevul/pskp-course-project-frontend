import React, { FC } from "react";
import "./InputField.css";
import "./TextField.css";

interface TextFieldProps {
  text: string;
}

const TextField: FC<TextFieldProps> = ({ text }) => {
  return (
    <div className="input_container">
      <p className="text_field">{text}</p>
    </div>
  );
};

export default TextField;
