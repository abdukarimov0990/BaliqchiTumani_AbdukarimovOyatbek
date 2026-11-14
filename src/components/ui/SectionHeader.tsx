import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Qorong'i fon ustida ishlatilganda */
  onDark?: boolean;
}

export function SectionHeader({ eyebrow, title, description, onDark }: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${onDark ? styles.onDark : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
