import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginPage.css";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import Dialog from "../components/Dialog";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    try {
      await login(username, password);
      navigate("/workplace");
    } catch (err: any) {
      if (err.response) console.log(err.response);
      setError("Invalid username or password");
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

        {error && <p className="error">{error}</p>}

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
