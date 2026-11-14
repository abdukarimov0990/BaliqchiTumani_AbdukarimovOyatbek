import { Clock, Phone } from "lucide-react";
import { site } from "../../config/site";
import { getCategories } from "../../utils/materials";
import { Logo } from "../ui/Logo";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.tagline}>{site.tagline}. Ortiqcha material — kimgadir aynan kerakli material.</p>
        </div>

        <div>
          <h3 className={styles.heading}>Bo'limlar</h3>
          <ul className={styles.list}>
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.heading}>Toifalar</h3>
          <ul className={styles.list}>
            {getCategories().map((category) => (
              <li key={category}>
                <a href="/#catalog" className={styles.link}>
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.heading}>Aloqa</h3>
          <ul className={styles.list}>
            {site.info.map((item) =>
              item.icon === "phone" ? (
                <li key={item.label} className={styles.contact}>
                  <Phone size={16} />
                  <a href={item.href} className={styles.link}>
                    {item.value}
                  </a>
                </li>
              ) : item.icon === "clock" ? (
                <li key={item.label} className={styles.contact}>
                  <Clock size={16} />
                  {item.value}
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          © {year} {site.name.primary} {site.name.accent}. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
