import styles from "../Login/Login.module.css";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { register } from "../../api/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { sendRequest } = useAxios();

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Добро пожаловать</h2>
          <h1 className={styles.h1}>Создайте аккаунт</h1>
          <div>
            <p className={styles.p}>Логин</p>
            <input
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Введите Ваш логин"
            />
          </div>
          <div style={{ marginTop: 38, marginBottom: 79 }}>
            <p className={styles.p}>Пароль</p>
            <input
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Введите Ваш пароль"
            />
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
      <img src="humans.svg" alt="" />
    </div>
  );
};

export default Register;
