import styles from "./Login.module.css";
import image from "../../humans.svg";

const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2>Добро пожаловать</h2>
          <h1>Войдите в аккаунт</h1>
          <div>
            <p>Логин</p>
            <input type="text" placeholder="Введите Ваш логин" />
          </div>
          <div style={{ marginTop: 38, marginBottom: 79 }}>
            <p>Пароль</p>
            <input type="text" placeholder="Введите Ваш пароль" />
          </div>
          <button>Войти</button>
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
