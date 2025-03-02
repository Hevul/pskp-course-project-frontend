import React, { FC } from "react";
import Select, { StylesConfig } from "react-select";
import "./ComboBox.css";

interface ComboBoxProps {
  text: string;
  options: OptionType[];
  value: OptionType | null;
  setValue: React.Dispatch<React.SetStateAction<OptionType | null>>;
}

interface OptionType {
  value: string;
  label: string;
}

const customStyles: StylesConfig<OptionType> = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "16px",
    color: state.isFocused ? "black" : "white",
    backgroundColor: state.isFocused ? "white" : "black",
    fontFamily: "IBM Plex Mono",
    fontWeight: "400",
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    borderRadius: "0px",
    backgroundColor: "black",
    fontFamily: "IBM Plex Mono",
    fontWeight: "400",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "white",
    backgroundColor: "black",
    fontFamily: "IBM Plex Mono",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0",
    marginTop: "0",
    backgroundColor: "black",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "IBM Plex Mono",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    fontFamily: "IBM Plex Mono",
  }),
};

const ComboBox: FC<ComboBoxProps> = ({ text, options, value, setValue }) => {
  return (
    <div className="input_container">
      <p className="input_field">{text}</p>
      <div style={{ width: "100%", marginRight: "40px" }}>
        <Select<OptionType>
          options={options}
          styles={customStyles}
          isSearchable={false}
          placeholder=""
          noOptionsMessage={() => "no options"}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
    </div>
  );
};

export default ComboBox;
