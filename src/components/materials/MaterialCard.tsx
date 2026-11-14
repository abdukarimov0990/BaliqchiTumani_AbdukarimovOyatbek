import { useState } from "react";
import { Layers, MapPin, Package, ShoppingCart, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import type { Material } from "../../types/material";
import { formatPrice, formatRegion } from "../../utils/format";
import { getIssue } from "../../utils/materials";
import { AddToCartButton } from "../cart/AddToCartButton";
import { CheckoutModal } from "../purchase/CheckoutModal";
import { MaterialImage } from "./MaterialImage";
import styles from "./MaterialCard.module.css";

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  const priceIssue = getIssue(material, "price");
  const regionIssue = getIssue(material, "region");
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  return (
    <article className={styles.card}>
      <MaterialImage material={material} />

      <div className={styles.body}>
        <span className={styles.id}>ID: {material.id}</span>
        <h3 className={styles.name}>
          {/* Butun kartochka bosiladigan bo'lishi uchun link ::after orqali cho'zilgan */}
          <Link to={`/materials/${material.id}`} className={styles.link}>
            {material.name}
          </Link>
        </h3>

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>
              <Layers size={16} /> Toifa
            </dt>
            <dd>{material.category}</dd>
          </div>
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

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>1 {material.unit} narxi</span>
            <span className={`${styles.price} ${priceIssue ? styles.flagged : ""}`} title={priceIssue?.note}>
              {formatPrice(material.price)}
            </span>
          </div>
          {/* Xarid qilish — 80%, savat — 20% */}
          <div className={styles.actions}>
            <button type="button" className={styles.buyButton} onClick={() => setPurchaseOpen(true)}>
              <ShoppingCart size={18} />
              Xarid qilish
            </button>
            <AddToCartButton material={material} />
          </div>
        </div>
      </div>

      <CheckoutModal
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        items={[{ material, quantity: 1 }]}
        editableQuantity
      />
    </article>
  );
}
