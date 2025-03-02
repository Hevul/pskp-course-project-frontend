import React, { FC, useEffect, useState } from "react";
import Dialog from "../Dialog";
import ComboBox from "../ComboBox";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import getAllUserStoragesApi from "../../api/getAllUserStoragesApi";
import { useStorage } from "../../contexts/StorageContext";

interface OptionType {
  value: string;
  label: string;
}

interface SelectStorageDialogProps {
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
}

const SelectStorageDialog: FC<SelectStorageDialogProps> = ({
  onSecondaryClick,
  onPrimaryClick,
}) => {
  const [option, setOption] = useState<OptionType | null>(null);
  const [options, setOptions] = useState<OptionType[]>([]);
  const { setStorage } = useStorage();

  useEffect(() => {
    const fetchStoragesData = async () => {
      try {
        const response = await getAllUserStoragesApi();
        console.log(response);

        const transformedStorages = response.map((storage: any) => ({
          value: storage.id,
          label: storage._name,
        }));

        setOptions(transformedStorages);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchStoragesData();
  }, []);

  onPrimaryClick = () => {
    if (!option) return;

    setStorage({ id: option.value, name: option.label });
  };

  return (
    <Dialog title="Select storage">
      <ComboBox
        text="Storage:"
        options={options}
        value={option}
        setValue={setOption}
      />

      <div className="buttons">
        <SecondaryButton text="Cancel" onClick={onSecondaryClick} />
        <PrimaryButton text="Select" onClick={onPrimaryClick} />
      </div>
    </Dialog>
  );
};

export default SelectStorageDialog;
