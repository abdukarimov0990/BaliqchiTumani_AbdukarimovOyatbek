import type { Material } from "../../types/material";
import { MaterialCard } from "./MaterialCard";
import styles from "./MaterialGrid.module.css";

interface MaterialGridProps {
  materials: Material[];
}

/** Kartochkalar to'ri: desktopda 3, planshetda 2, telefonda 1 ustun. */
export function MaterialGrid({ materials }: MaterialGridProps) {
  return (
    <div className={styles.grid}>
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} />
      ))}
    </div>
  );
}
