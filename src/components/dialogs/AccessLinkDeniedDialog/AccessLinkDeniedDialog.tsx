import { FC } from "react";
import Button from "../../Button/Button";
import DialogShell from "../DialogShell";
import styles from "./AccessLinkDeniedDialog.module.css";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../../contexts/DialogContext";

interface Props {
  reason: "not-authorized" | "no-access";
}

const AccessLinkDeniedDialog: FC<Props> = ({ reason }) => {
  const navigate = useNavigate();
  const { close } = useDialog();

  const handleClick = () => {
    if (reason === "not-authorized") navigate("/login");
    else navigate("/dashboard");
    close();
  };

  return (
    <DialogShell title="Доступ к ссылке запрещён!">
      <h1 className={styles.h1}>
        {reason === "not-authorized"
          ? "Доступ к ссылке запрещён, так как вы не вошли в свой аккаунт."
          : "Доступ к ссылке запрещён, так как вы не находитесь в списке доверенных этой ссылки."}
      </h1>

      <div className={styles.buttons}>
        <Button
          title={
            reason === "not-authorized"
              ? "Войти в аккаунт"
              : "Перейти на главную"
          }
          onClick={handleClick}
        />
      </div>
    </DialogShell>
  );
};

export default AccessLinkDeniedDialog;
