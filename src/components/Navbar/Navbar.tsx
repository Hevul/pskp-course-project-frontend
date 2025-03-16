import styles from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import FilesIcon from "../icons/FilesIcon";
import RepositoryIcon from "../icons/RepositoryIcon";
import NavButton from "../NavButton/NavButton";
import LogoutIcon from "../icons/LogoutIcon";
import useAxios from "../../hooks/useAxios";
import { logout } from "../../api/auth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sendRequest } = useAxios();

  const currentUrl = location.pathname;

  return (
    <div className={styles.nav}>
      <div className={styles.buttons}>
        <NavButton
          icon={<FilesIcon />}
          isActive={"/dashboard" === currentUrl}
          onClick={() => navigate("/dashboard")}
        />
        <NavButton
          icon={<RepositoryIcon />}
          isActive={"/storage" === currentUrl}
          onClick={() => navigate("/storage")}
        />

        <div className={styles.logoutDiv}>
          <NavButton
            icon={<LogoutIcon />}
            isActive={"/login" === currentUrl}
            onClick={() => {
              sendRequest(logout());
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
