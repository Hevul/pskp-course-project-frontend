import styles from "../Login/Login.module.css";
import image from "../../humans.svg";

const Register = () => {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h2>Добро пожаловать</h2>
          <h1>Создайте аккаунт</h1>
          <div>
            <p>Логин</p>
            <input type="text" placeholder="Введите Ваш логин" />
          </div>
          <div style={{ marginTop: 38, marginBottom: 79 }}>
            <p>Пароль</p>
            <input type="text" placeholder="Введите Ваш пароль" />
          </div>
          <button>Вход в аккаунт</button>
          <div className={styles.register}>
            <p>Уже есть аккаунт?</p>
            <a href="/login">Вход в аккаунт</a>
          </div>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Register;
