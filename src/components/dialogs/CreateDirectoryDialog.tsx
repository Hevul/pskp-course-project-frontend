import { FC, useState } from "react";
import Dialog from "../Dialog";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import InputField from "../InputField";
import useAxios from "../../hooks/useAxios";
import { create } from "../../api/storages";

interface Props {
  closeDialog?: () => void;
}

const CreateDirectoryDialog: FC<Props> = ({ closeDialog }) => {
  const [name, setName] = useState("");

  return (
    <Dialog title="Create directory">
      <InputField text="Name:" value={name} setValue={setName} />

      <div className="buttons">
        <SecondaryButton text="Cancel" onClick={closeDialog} />
        <PrimaryButton text="Create" />
      </div>
    </Dialog>
  );
};

export default CreateDirectoryDialog;
