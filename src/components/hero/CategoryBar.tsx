import { useState } from "react";
import { ALL_CATEGORIES, getCategoryIcon } from "../../config/categories";
import { countByCategory, getAllMaterials, getCategories } from "../../utils/materials";
import styles from "./CategoryBar.module.css";

/** Material toifalari qatori. Hozircha faqat tanlangan toifani ajratib ko'rsatadi, filtrlash keyingi bosqichda. */
export function CategoryBar() {
  const [selected, setSelected] = useState(ALL_CATEGORIES);

  const items = [
    { name: ALL_CATEGORIES, count: getAllMaterials().length },
    ...getCategories().map((name) => ({ name, count: countByCategory(name) })),
  ];

  return (
    <ul className={styles.list} aria-label="Material toifalari">
      {items.map(({ name, count }) => {
        const Icon = getCategoryIcon(name);
        const isSelected = name === selected;

        return (
          <li key={name}>
            <button
              type="button"
              className={`${styles.item} ${isSelected ? styles.selected : ""}`}
              aria-pressed={isSelected}
              onClick={() => setSelected(name)}
            >
              <span className={styles.icon}>
                <Icon size={22} strokeWidth={2} />
              </span>
              <span className={styles.text}>
                <span className={styles.name}>{name}</span>
                <span className={styles.count}>{count} ta material</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
