import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Search from "../../components/Search/Search";
import LinkRow from "./components/LinkRow";
import styles from "./MyLinks.module.css";
import { useLinks } from "../../contexts/LinksContext";
import Loading from "../../components/Loading/Loading";
import EmptyState from "../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../components/icons/EmptyBoxIcon";
import Layout from "../Layout/Layout";

const MyLinks = () => {
  const { links, loading } = useLinks();
  const isEmpty = links.length === 0;

  return (
    <ProtectedRoute>
      <Layout>
        <div className={styles.main}>
          <div className={styles.top}>
            <h2 className={styles.h2}>Мои ссылки</h2>
            <Search width="500px" search={""} setSearch={() => {}} />
          </div>

          {loading ? (
            <Loading size="large" />
          ) : isEmpty ? (
            <div className={styles.emptyState}>
              <EmptyState
                message="У вас пока нет ссылок на файлы"
                subMessage="Поделитесь файлом, чтобы ссылка появилась здесь"
                icon={<EmptyBoxIcon />}
              />
            </div>
          ) : (
            <div className={styles.links}>
              {links.map((link, index) => (
                <LinkRow key={link.id} id={index + 1} link={link} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default MyLinks;
