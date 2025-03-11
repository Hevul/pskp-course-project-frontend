import styles from "./Navbar.module.css";
import FilesIcon from "../FilesIcon/FilesIcon";
import RepositoryIcon from "../RepositoryIcon/RepositoryIcon";
import NavButton from "../NavButton/NavButton";
import LogoutIcon from "../LogoutIcon/LogoutIcon";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.buttons}>
        <NavButton icon={<FilesIcon />} url="/dashboard" />
        <NavButton icon={<RepositoryIcon />} url="/storage" />

        <div className={styles.logoutDiv}>
          <NavButton icon={<LogoutIcon />} url="/login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
