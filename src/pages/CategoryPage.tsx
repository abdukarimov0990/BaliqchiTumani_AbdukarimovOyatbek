import { ChevronRight, PackageX } from "lucide-react";
import { useParams } from "react-router";
import { ALL_CATEGORIES, findCategoryBySlug } from "../config/categories";
import { CategoryBar } from "../components/hero/CategoryBar";
import { MaterialGrid } from "../components/materials/MaterialGrid";
import { Button } from "../components/ui/Button";
import { CategoryIcon } from "../components/ui/CategoryIcon";
import { filterMaterials, getAllMaterials, getCategories } from "../utils/materials";
import styles from "./CategoryPage.module.css";

export function CategoryPage() {
  const { slug = "" } = useParams();
  const category = findCategoryBySlug(slug, getCategories());

  if (!category) {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.notFound}`}>
          <span className={styles.notFoundIcon}>
            <PackageX size={32} />
          </span>
          <h1 className={styles.notFoundTitle}>Toifa topilmadi</h1>
          <p className={styles.notFoundText}>Bunday toifa mavjud emas yoki o'chirilgan.</p>
          <Button href="/" variant="dark">
            Bosh sahifaga qaytish
          </Button>
        </div>
      </section>
    );
  }

  const isAll = category === ALL_CATEGORIES;
  const materials = filterMaterials(getAllMaterials(), { category: isAll ? null : category, region: null });

  return (
    <section className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Sahifa yo'li">
          <a href="/">Bosh sahifa</a>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{category}</span>
        </nav>

        <header className={styles.header}>
          <span className={styles.icon}>
            <CategoryIcon category={category} size={28} />
          </span>
          <div>
            <h1 className={styles.title}>{isAll ? "Barcha materiallar" : category}</h1>
            <p className={styles.count}>{materials.length} ta material</p>
          </div>
        </header>

        <div className={styles.tabs}>
          <CategoryBar active={category} />
        </div>

        <MaterialGrid materials={materials} />
      </div>
    </section>
  );
}
