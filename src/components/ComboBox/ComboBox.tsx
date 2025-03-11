import { FC, useState } from "react";
import Select, { StylesConfig } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  //   options: OptionType[];
  //   value: OptionType | null;
  //   setValue: React.Dispatch<React.SetStateAction<OptionType | null>>;
}

const customStyles: StylesConfig<OptionType> = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "16px",
    color: state.isFocused ? "white" : "#3A3A49",
    backgroundColor: state.isFocused ? "#4676FB" : "white",
    fontWeight: "400",
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "1px solid #4676FB",
    borderRadius: "4px",
    backgroundColor: "white",
    fontWeight: "400",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "#3A3A49",
    backgroundColor: "white",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0",
    marginTop: "0",
    backgroundColor: "white",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    textAlign: "left",
    fontSize: "16px",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px",
    color: "#ADC0F8",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#ADC0F8",
    "&:hover": {
      color: "#ADC0F8",
    },
  }),
};

const ComboBox: FC<Props> = ({}) => {
  const [option, setOption] = useState<OptionType | null>(null);

  const options: OptionType[] = [
    {
      value: "1",
      label: "Выберите директорий",
    },
    {
      value: "2",
      label: "dir2",
    },
    {
      value: "3",
      label: "dir3",
    },
  ];

  return (
    <div style={{ width: 280 }}>
      <Select<OptionType>
        options={options}
        styles={customStyles}
        isSearchable={false}
        placeholder=""
        noOptionsMessage={() => "Директориев нет"}
        value={option}
        onChange={(newValue) => setOption(newValue)}
      />
    </div>
  );
};

export default ComboBox;
