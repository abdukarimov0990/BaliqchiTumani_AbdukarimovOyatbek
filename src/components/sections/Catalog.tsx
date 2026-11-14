import { useState } from "react";
import { PackageSearch } from "lucide-react";
import {
  filterMaterials,
  getAllMaterials,
  getCategories,
  getRegionOptions,
  type MaterialFilter,
} from "../../utils/materials";
import { MaterialFilters } from "../materials/MaterialFilters";
import { MaterialGrid } from "../materials/MaterialGrid";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./Catalog.module.css";

const categoryOptions = getCategories().map((category) => ({ value: category, label: category }));
const regionOptions = getRegionOptions();

export function Catalog() {
  const [filter, setFilter] = useState<MaterialFilter>({ category: null, region: null });
  const materials = filterMaterials(getAllMaterials(), filter);

  return (
    <section className={styles.section} id="catalog">
      <div className="container">
        <SectionHeader
          eyebrow="Katalog"
          title="Mavjud materiallar"
          description="Har bir material miqdori, narxi va joylashgan hududi bilan ko'rsatilgan."
        />

        <MaterialFilters
          filter={filter}
          onChange={setFilter}
          categoryOptions={categoryOptions}
          regionOptions={regionOptions}
          resultCount={materials.length}
        />

        {materials.length > 0 ? (
          <MaterialGrid materials={materials} />
        ) : (
          <div className={styles.empty}>
            <PackageSearch size={32} />
            <p>Tanlangan toifa va hudud bo'yicha material topilmadi.</p>
            <button type="button" className={styles.emptyReset} onClick={() => setFilter({ category: null, region: null })}>
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
