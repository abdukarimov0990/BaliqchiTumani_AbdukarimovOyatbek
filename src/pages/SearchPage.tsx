import { useEffect } from "react";
import { SearchX } from "lucide-react";
import { useSearchParams } from "react-router";
import { MaterialGrid } from "../components/materials/MaterialGrid";
import { SearchBar } from "../components/search/SearchBar";
import { Button } from "../components/ui/Button";
import { searchMaterials } from "../utils/materials";
import styles from "./SearchPage.module.css";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const results = searchMaterials(query);

  // Yangi qidiruvda sahifa boshidan ko'rsatiladi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <section className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.eyebrow}>Qidiruv</span>
          <h1 className={styles.title}>{query ? `“${query}” bo'yicha natijalar` : "Barcha materiallar"}</h1>
          <p className={styles.count}>{results.length} ta material topildi</p>
        </header>

        <div className={styles.search}>
          <SearchBar defaultValue={query} />
        </div>

        {results.length > 0 ? (
          <MaterialGrid materials={results} />
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <SearchX size={32} />
            </span>
            <h2 className={styles.emptyTitle}>Hech narsa topilmadi</h2>
            <p className={styles.emptyText}>Boshqa nom bilan qidirib ko'ring, masalan: kafel, yog'och yoki bo'yoq.</p>
            <Button href="/" variant="dark">
              Bosh sahifaga qaytish
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
