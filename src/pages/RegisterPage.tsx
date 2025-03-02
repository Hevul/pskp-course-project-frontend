import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import Dialog from "../components/Dialog";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setHasError(false);

    try {
      await axios.post("http://localhost:3001/api/users/register", {
        login,
        password,
      });

      navigate("/login");
    } catch (error: any) {
      setHasError(true);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Dialog title="Register">
          <div className="loading_container">
            <div className="hourglass"></div>
            <p className="loading_text">Loading...</p>
          </div>
        </Dialog>
      ) : (
        <Dialog title="Register">
          <InputField text="Login:" value={login} setValue={setLogin} />

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
              text="Go to log in"
              onClick={() => navigate("/login")}
            />
            <PrimaryButton text="Register" onClick={handleRegister} />
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default LoginPage;
