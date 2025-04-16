import styles from "./Navbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import FilesIcon from "../../../../components/icons/FilesIcon";
import RepositoryIcon from "../../../../components/icons/RepositoryIcon";
import NavButton from "../NavButton/NavButton";
import LogoutIcon from "../../../../components/icons/LogoutIcon";
import useAxios from "../../../../hooks/useAxios";
import { logout } from "../../../../api/auth";
import { useStorage } from "../../../../contexts/StorageContext";
import LinkIcon from "../../../../components/icons/LinkIcon";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sendRequest } = useAxios();
  const { selectStorage } = useStorage();

  const currentUrl = location.pathname;

  return (
    <div className={styles.nav}>
      <div className={styles.buttons}>
        <div className={styles.navButtons}>
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
          <NavButton
            icon={<LinkIcon />}
            isActive={"/my-links" === currentUrl}
            onClick={() => navigate("/my-links")}
          />
        </div>

        <div className={styles.logoutDiv}>
          <NavButton
            icon={<LogoutIcon />}
            isActive={"/login" === currentUrl}
            onClick={async () => {
              await sendRequest(logout());
              selectStorage(null);
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
