import { FC, useEffect, useState } from "react";
import Dialog from "../Dialog";
import ComboBox from "../ComboBox";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import { useStorage } from "../../contexts/StorageContext";
import { getAll } from "../../api/storages";
import useAxios from "../../hooks/useAxios";

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  closeDialog?: () => void;
}

const parseStoragesResponse = (response: any) => {
  return response.data.map((storage: any) => ({
    value: storage.id,
    label: storage._name,
  }));
};

const SelectStorageDialog: FC<Props> = ({ closeDialog }) => {
  const { storage, setStorage } = useStorage();
  const [option, setOption] = useState<OptionType | null>(null);
  const [options, setOptions] = useState<OptionType[]>([]);

  const { response: storagesResponse, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest(getAll());
  }, []);

  useEffect(() => {
    if (!storagesResponse) return;

    const transformedStorages = parseStoragesResponse(storagesResponse);
    setOptions(transformedStorages);
  }, [storagesResponse]);

  useEffect(() => {
    if (storage) setOption({ value: storage.id, label: storage.name });
  }, [storage]);

  const selectStorage = () => {
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
        <SecondaryButton text="Cancel" onClick={closeDialog} />
        <PrimaryButton text="Select" onClick={selectStorage} />
      </div>
    </Dialog>
  );
};

export default SelectStorageDialog;
