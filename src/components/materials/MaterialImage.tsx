import type { Material } from "../../types/material";
import { CategoryIcon } from "../ui/CategoryIcon";
import styles from "./MaterialImage.module.css";

interface MaterialImageProps {
  material: Material;
  className?: string;
}

/** Material rasmi. Rasm bo'lmasa, toifa ikonkasi bilan placeholder ko'rsatiladi. */
export function MaterialImage({ material, className = "" }: MaterialImageProps) {
  if (material.image) {
    return <img className={`${styles.image} ${className}`} src={material.image} alt={material.name} loading="lazy" />;
  }

  return (
    <div className={`${styles.placeholder} ${className}`} role="img" aria-label={`${material.name} — rasm yo'q`}>
      <span className={styles.icon}>
        <CategoryIcon category={material.category} size={32} strokeWidth={1.75} />
      </span>
      <span className={styles.label}>Rasm tez orada</span>
    </div>
  );
}
