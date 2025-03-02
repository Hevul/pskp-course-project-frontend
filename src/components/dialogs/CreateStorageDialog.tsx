import React, { FC, useState } from "react";
import Dialog from "../Dialog";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import InputField from "../InputField";
import createStorageApi from "../../api/createStorageApi";

interface CreateStorageDialogProps {
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
}

const CreateStorageDialog: FC<CreateStorageDialogProps> = ({
  onSecondaryClick,
  onPrimaryClick,
}) => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const response = await createStorageApi(name);
  };

  return (
    <Dialog title="Create storage">
      <InputField text="Name:" value={name} setValue={setName} />

      <div className="buttons">
        <SecondaryButton text="Cancel" onClick={onSecondaryClick} />
        <PrimaryButton text="Create" onClick={handleCreate} />
      </div>
    </Dialog>
  );
};

export default CreateStorageDialog;
