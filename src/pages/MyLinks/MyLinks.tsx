import { useState, useMemo, useEffect } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Search from "../../components/Search/Search";
import styles from "./MyLinks.module.css";
import { useLinks } from "../../contexts/LinksContext";
import Loading from "../../components/Loading/Loading";
import EmptyState from "../../components/EmptyState/EmptyState";
import EmptyBoxIcon from "../../components/icons/EmptyBoxIcon";
import Layout from "../Layout/Layout";
import LinkTableTiled from "./components/LinkTableTiled/LinkTableTiled";

const MyLinks = () => {
  const { links, loading, refresh } = useLinks();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = useMemo(() => {
    if (!searchQuery) return links;

    return links.filter((link) =>
      link.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [links, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isRefEmpty = links.length === 0;
  const isFilteredEmpty = filteredLinks.length === 0;

  useEffect(() => {
    refresh(); // Чтобы обновлялось при заходе на страницу
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <div className={styles.main}>
          <div className={styles.top}>
            <h2 className={styles.h2}>Мои ссылки</h2>
          </div>

          {loading ? (
            <Loading size="large" />
          ) : isRefEmpty ? (
            <div className={styles.emptyState}>
              <EmptyState
                message={"У вас пока нет ссылок"}
                subMessage={"Поделитесь файлом, чтобы ссылка появилась здесь"}
                icon={<EmptyBoxIcon />}
              />
            </div>
          ) : isFilteredEmpty ? (
            <div className={styles.emptyState}>
              <EmptyState
                message={"Ничего не найдено"}
                subMessage={"Попробуйте изменить поисковый запрос"}
                icon={<EmptyBoxIcon />}
              />
            </div>
          ) : (
            <LinkTableTiled links={filteredLinks} />
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default MyLinks;
