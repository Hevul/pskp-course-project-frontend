import React, { FC } from "react";
import "./CheckBox.css";

interface CheckBoxProps {
  text: string;
  isChecked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBox: FC<CheckBoxProps> = ({ text, isChecked, setChecked }) => {
  return (
    <div className="input_container">
      <p className="input_field">{text}</p>

      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default CheckBox;
