import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import Dialog from "../components/Dialog";
import checkServerHealthAPI from "../api/checkServerHealthApi";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchServerStatus = async () => {
      const isHealthy = await checkServerHealthAPI();

      if (isHealthy) {
        setHasError(true);
        setError("Зашибись");
      } else {
        setHasError(true);
        setError("Абонент кайфует");
      }
    };

    fetchServerStatus();
  }, []);

  const handleLogin = async () => {
    try {
      await login(username, password);

      setError("");
      setHasError(false);
    } catch (error: any) {
      setHasError(true);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
      <Dialog title="Log In">
        <InputField text="Login:" value={username} setValue={setUsername} />

        <div style={{ marginTop: 12 }}>
          <InputField
            text="Password:"
            value={password}
            setValue={setPassword}
          />
        </div>

        {hasError && <p className="error">{error}</p>}

        <div className="buttons">
          <SecondaryButton
            text="Go to register"
            onClick={() => navigate("/register")}
          />
          <PrimaryButton text="Log In" onClick={handleLogin} />
        </div>
      </Dialog>
    </div>
  );
};

export default LoginPage;
