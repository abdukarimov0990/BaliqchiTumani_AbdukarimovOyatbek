import { getAllMaterials } from "../../utils/materials";
import { MaterialCard } from "../materials/MaterialCard";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./Catalog.module.css";

export function Catalog() {
  return (
    <section className={styles.section} id="catalog">
      <div className="container">
        <SectionHeader
          eyebrow="Katalog"
          title="Mavjud materiallar"
          description="Har bir material miqdori, narxi va joylashgan hududi bilan ko'rsatilgan."
        />
        <div className={styles.grid}>
          {getAllMaterials().map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
}
