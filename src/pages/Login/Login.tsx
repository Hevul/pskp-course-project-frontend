import styles from "./Login.module.css";
import image from "../../humans.svg";
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
          <h2>Добро пожаловать</h2>
          <h1>Войдите в аккаунт</h1>
          <div>
            <p>Логин</p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Введите Ваш логин"
            />
          </div>
          <div style={{ marginTop: 38, marginBottom: 79 }}>
            <p>Пароль</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Введите Ваш пароль"
            />
          </div>
          <button onClick={handleLogin}>Войти</button>
          <div className={styles.register}>
            <p>Ещё не создали аккаунт?</p>
            <a href="/register">Создать аккаунт</a>
          </div>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Login;
