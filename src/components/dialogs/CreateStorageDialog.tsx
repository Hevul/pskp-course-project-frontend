import { FC, useState } from "react";
import Dialog from "../Dialog";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import InputField from "../InputField";
import useAxios from "../../hooks/useAxios";
import { create } from "../../api/storages";

interface CreateStorageDialogProps {
  closeDialog?: () => void;
}

const CreateStorageDialog: FC<CreateStorageDialogProps> = ({ closeDialog }) => {
  const [name, setName] = useState("");
  const { sendRequest } = useAxios();

  return (
    <Dialog title="Create storage">
      <InputField text="Name:" value={name} setValue={setName} />

      <div className="buttons">
        <SecondaryButton text="Cancel" onClick={closeDialog} />
        <PrimaryButton
          text="Create"
          onClick={() => sendRequest(create(name))}
        />
      </div>
    </Dialog>
  );
};

export default CreateStorageDialog;
