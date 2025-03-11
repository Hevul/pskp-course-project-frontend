import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    try {
      await login(username, password);
    } catch (err: any) {
      if (err.response) console.log(err.response);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Добро пожаловать</h2>
          <h1 className={styles.h1}>Войдите в аккаунт</h1>
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
          <button className={styles.button} onClick={handleLogin}>
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
