import { Link } from "react-router";
import { ALL_CATEGORIES, categoryPath } from "../../config/categories";
import { countByCategory, getAllMaterials, getCategories } from "../../utils/materials";
import { CategoryIcon } from "../ui/CategoryIcon";
import styles from "./CategoryBar.module.css";

interface CategoryBarProps {
  /** Hozir ochiq turgan toifa — sariq bilan ajratiladi */
  active?: string;
}

/** Material toifalari qatori. Har bir blok o'z toifa sahifasini ochadi. */
export function CategoryBar({ active }: CategoryBarProps) {
  const items = [
    { name: ALL_CATEGORIES, count: getAllMaterials().length },
    ...getCategories().map((name) => ({ name, count: countByCategory(name) })),
  ];

  return (
    <ul className={styles.list} aria-label="Material toifalari">
      {items.map(({ name, count }) => {
        const isActive = name === active;

        return (
          <li key={name}>
            <Link
              to={categoryPath(name)}
              className={`${styles.item} ${isActive ? styles.selected : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={styles.icon}>
                <CategoryIcon category={name} size={22} strokeWidth={2} />
              </span>
              <span className={styles.text}>
                <span className={styles.name}>{name}</span>
                <span className={styles.count}>{count} ta material</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
