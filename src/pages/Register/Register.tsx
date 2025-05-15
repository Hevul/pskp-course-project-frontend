import styles from "../Login/Login.module.css";
import { useState, useEffect } from "react";
import { register } from "../../api/user";
import useAxios from "../../hooks/useAxios";
import BigInput from "../../components/BigInput/BigInput";
import InputValidationError from "../../components/InputValidationError/InputValidationError";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../contexts/PopupContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const navigate = useNavigate();
  const { show } = usePopup();

  // Валидация совпадения паролей
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const { sendRequest, loading } = useAxios({
    onSuccess(response) {
      show("Аккаунт успешно создан!", { iconType: "success" });
      navigate("/login");
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

  const handleSubmit = () => {
    // Проверка перед отправкой
    if (password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
      return;
    }

    sendRequest(register(username, password));
  };

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
          <div style={{ marginTop: 40 }}>
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
          <div style={{ marginTop: 30, marginBottom: 40 }}>
            <BigInput
              label="Подтвердите пароль"
              placeholder="Повторите Ваш пароль"
              value={confirmPassword}
              setValue={setConfirmPassword}
              error={confirmPasswordError}
              type="password"
            />
            <InputValidationError error={confirmPasswordError} />
          </div>
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={loading || !!confirmPasswordError}
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
