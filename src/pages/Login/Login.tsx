import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import BigInput from "../../components/BigInput/BigInput";
import InputValidationError from "../../components/InputValidationError/InputValidationError";
import useAxios from "../../hooks/useAxios";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      navigate("/dashboard");
    },
    onError(error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        const loginErrorObj = errors.find((err: any) => err.path === "login");
        if (loginErrorObj) setLoginError(loginErrorObj.msg);
        else setLoginError(null);

        const passwordErrorObj = errors.find(
          (err: any) => err.path === "password"
        );
        if (passwordErrorObj) setPasswordError(passwordErrorObj.msg);
        else setPasswordError(null);
      }
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Добро пожаловать</h2>
          <h1 className={styles.h1}>Войдите в аккаунт</h1>
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
              type="password"
            />
            <InputValidationError error={passwordError} />
          </div>
          <button
            className={styles.button}
            onClick={() => sendRequest(login(username, password))}
            disabled={loading}
          >
            Войти
          </button>
          <div className={styles.register}>
            <p>Ещё не создали аккаунт?</p>
            <a className={styles.a} href="/register">
              Создать аккаунт
            </a>
          </div>
        </div>
      </div>
      <img src="humans.svg" alt="" />
    </div>
  );
};

export default Login;
