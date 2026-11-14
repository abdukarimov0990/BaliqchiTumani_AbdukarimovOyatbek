import { MapPin, Package, TriangleAlert } from "lucide-react";
import type { Material } from "../../types/material";
import { formatPrice, formatRegion } from "../../utils/format";
import { getIssue } from "../../utils/materials";
import { Button } from "../ui/Button";
import styles from "./MaterialCard.module.css";

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  const priceIssue = getIssue(material, "price");
  const regionIssue = getIssue(material, "region");

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category}>{material.category}</span>
        <span className={styles.code}>{material.id}</span>
      </div>

      <h3 className={styles.name}>{material.name}</h3>

      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt>
            <Package size={16} /> Mavjud
          </dt>
          <dd>
            {material.quantity} {material.unit}
          </dd>
        </div>
        <div className={styles.metaRow}>
          <dt>
            <MapPin size={16} /> Hudud
          </dt>
          <dd className={regionIssue ? styles.flagged : undefined} title={regionIssue?.note}>
            {formatRegion(material.region)}
          </dd>
        </div>
      </dl>

      <div className={styles.footer}>
        <div>
          <span className={styles.priceLabel}>Narxi</span>
          <span className={`${styles.price} ${priceIssue ? styles.flagged : ""}`} title={priceIssue?.note}>
            {formatPrice(material.price)}
          </span>
        </div>
        <Button variant="dark">Tanlash</Button>
      </div>

      {material.issues.length > 0 && (
        <ul className={styles.issues}>
          {material.issues.map((issue) => (
            <li key={issue.field}>
              <TriangleAlert size={14} />
              {issue.note}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
