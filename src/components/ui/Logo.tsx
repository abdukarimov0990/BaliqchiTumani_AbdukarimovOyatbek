import { HardHat } from "lucide-react";
import { site } from "../../config/site";
import styles from "./Logo.module.css";

interface LogoProps {
  /** "light" — sariq/och fon ustida (header), "dark" — to'q fon ustida (footer) */
  variant?: "light" | "dark";
}

export function Logo({ variant = "dark" }: LogoProps) {
  return (
    <a
      href="#top"
      className={`${styles.logo} ${styles[variant]}`}
      aria-label={`${site.name.primary} ${site.name.accent} — bosh sahifa`}
    >
      <span className={styles.mark}>
        <HardHat size={22} strokeWidth={2.25} />
      </span>
      <span className={styles.text}>
        {site.name.primary} <span className={styles.accent}>{site.name.accent}</span>
      </span>
    </a>
  );
}
