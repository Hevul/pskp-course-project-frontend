import React, { FC } from "react";
import "./InputField.css";

interface InputFieldProps {
  text: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: FC<InputFieldProps> = ({ text, value, setValue }) => {
  return (
    <div className="input_container">
      <p className="input_field">{text}</p>
      <input
        className="input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
