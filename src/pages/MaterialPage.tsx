import { useState } from "react";
import { ArrowLeft, ChevronRight, PackageX, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router";
import { MaterialImage } from "../components/materials/MaterialImage";
import { QuantitySelector } from "../components/materials/QuantitySelector";
import { PurchaseModal } from "../components/purchase/PurchaseModal";
import { Button } from "../components/ui/Button";
import { CategoryIcon } from "../components/ui/CategoryIcon";
import type { Material } from "../types/material";
import { formatPrice, formatRegion } from "../utils/format";
import { getMaterialById } from "../utils/materials";
import { validateQuantity } from "../utils/quantity";
import styles from "./MaterialPage.module.css";

export function MaterialPage() {
  const { id = "" } = useParams();
  const material = getMaterialById(id);

  if (!material) {
    return (
      <section className={styles.page}>
        <div className={`container ${styles.notFound}`}>
          <span className={styles.notFoundIcon}>
            <PackageX size={32} />
          </span>
          <h1 className={styles.notFoundTitle}>Material topilmadi</h1>
          <p className={styles.notFoundText}>“{id}” ID raqamli material mavjud emas yoki sotib bo'lingan.</p>
          <Button href="/#catalog" variant="dark">
            Barcha materiallar
          </Button>
        </div>
      </section>
    );
  }

  // key — boshqa materialga o'tilganda tanlangan miqdor qaytadan boshlanadi
  return <MaterialDetails key={material.id} material={material} />;
}

function MaterialDetails({ material }: { material: Material }) {
  const [quantity, setQuantity] = useState("1");
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const error = validateQuantity(quantity, material.quantity, material.unit);

  const specs = [
    { label: "Toifa", value: material.category },
    { label: "Mavjud miqdor", value: `${material.quantity} ${material.unit}` },
    { label: "O'lchov birligi", value: material.unit },
    { label: "Hudud", value: formatRegion(material.region) },
  ];

  return (
    <section className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Sahifa yo'li">
          <a href="/">Bosh sahifa</a>
          <ChevronRight size={14} aria-hidden="true" />
          <a href="/#catalog">Materiallar</a>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{material.name}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.media}>
            <MaterialImage material={material} />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>
              <CategoryIcon category={material.category} size={16} />
              {material.category}
            </span>
            <h1 className={styles.title}>{material.name}</h1>

            <div className={styles.priceBlock}>
              <span className={styles.price}>{formatPrice(material.price)}</span>
              <span className={styles.priceUnit}>/ 1 {material.unit}</span>
            </div>

            {material.issues.length > 0 && (
              <ul className={styles.issues}>
                {material.issues.map((issue) => (
                  <li key={issue.field}>{issue.note}</li>
                ))}
              </ul>
            )}

            <dl className={styles.specs}>
              {specs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.purchase}>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={material.quantity}
                unit={material.unit}
                error={error}
              />

              <div className={styles.total}>
                <span>Jami narx</span>
                <strong>{error ? "—" : formatPrice(Number(quantity) * material.price)}</strong>
              </div>

              <button
                type="button"
                className={styles.buyButton}
                disabled={Boolean(error)}
                onClick={() => setPurchaseOpen(true)}
              >
                <ShoppingCart size={20} />
                Xarid qilish
              </button>
            </div>

            <Link to="/" className={styles.back}>
              <ArrowLeft size={16} />
              Barcha materiallarga qaytish
            </Link>
          </div>
        </div>
      </div>

      <PurchaseModal
        material={material}
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        initialQuantity={Number(quantity)}
      />
    </section>
  );
}
