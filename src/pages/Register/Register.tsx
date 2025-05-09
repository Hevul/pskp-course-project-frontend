import styles from "../Login/Login.module.css";
import { useState } from "react";
import { register } from "../../api/user";
import useAxios from "../../hooks/useAxios";
import BigInput from "../../components/BigInput/BigInput";
import InputValidationError from "../../components/InputValidationError/InputValidationError";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../contexts/PopupContext";

const Register = () => {
  let loginError: string | null = null;
  let passwordError: string | null = null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { show } = usePopup();

  const { sendRequest } = useAxios({
    onSuccess(response) {
      show("Аккаунт успешно создан!", { iconType: "success" });
      navigate("/login");
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const loginErrorObj = errors.find((err: any) => err.path === "login");
        if (loginErrorObj) loginError = loginErrorObj.msg;

        const passwordErrorObj = errors.find(
          (err: any) => err.path === "password"
        );
        if (passwordErrorObj) passwordError = passwordErrorObj.msg;
      }
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Добро пожаловать</h2>
          <h1 className={styles.h1}>Создайте аккаунт</h1>
          <div>
            <BigInput
              label="Логин"
              placeholder="Введите Ваш логин"
              value={username}
              setValue={setUsername}
              error={loginError}
            />
            <InputValidationError error={loginError} />
          </div>
          <div style={{ marginTop: 38, marginBottom: 79 }}>
            <BigInput
              label="Пароль"
              placeholder="Введите Ваш пароль"
              value={password}
              setValue={setPassword}
              error={passwordError}
            />
            <InputValidationError error={passwordError} />
          </div>
          <button
            className={styles.button}
            onClick={() => sendRequest(register(username, password))}
          >
            Создать аккаунт
          </button>
          <div className={styles.register}>
            <p className={styles.p}>Уже есть аккаунт?</p>
            <a className={styles.a} href="/login">
              Вход в аккаунт
            </a>
          </div>
        </div>
      </div>
      <img className={styles.img} src="humans.svg" alt="" />
    </div>
  );
};

export default Register;
