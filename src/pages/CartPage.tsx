import { useState } from "react";
import { ChevronRight, ShoppingBasket, Trash2, Truck } from "lucide-react";
import { Link } from "react-router";
import { MaterialImage } from "../components/materials/MaterialImage";
import { QuantitySelector } from "../components/materials/QuantitySelector";
import { CheckoutModal } from "../components/purchase/CheckoutModal";
import { Button } from "../components/ui/Button";
import { delivery } from "../config/delivery";
import { useShop } from "../store/useShop";
import { formatPrice, formatRegion } from "../utils/format";
import { getMaterialById } from "../utils/materials";
import { validateQuantity } from "../utils/quantity";
import styles from "./CartPage.module.css";

export function CartPage() {
  const { cart, setCartQuantity, removeFromCart, clearCart } = useShop();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  // Yozilayotgan (hali tekshirilmagan) miqdorlar. To'g'ri bo'lsa, darhol savatga yoziladi.
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const rows = cart.flatMap((item) => {
    const material = getMaterialById(item.materialId);
    if (!material) return [];
    const value = drafts[material.id] ?? String(item.quantity);
    const error = validateQuantity(value, material.quantity, material.unit);
    return [{ material, quantity: item.quantity, value, error }];
  });

  const hasErrors = rows.some((row) => row.error);
  const total = rows.reduce((sum, row) => sum + row.quantity * row.material.price, 0);

  function changeQuantity(materialId: string, value: string, max: number, unit: string) {
    setDrafts((prev) => ({ ...prev, [materialId]: value }));
    if (!validateQuantity(value, max, unit)) setCartQuantity(materialId, Number(value));
  }

  function remove(materialId: string) {
    removeFromCart(materialId);
    setDrafts(({ [materialId]: _removed, ...rest }) => rest);
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Sahifa yo'li">
          <a href="/">Bosh sahifa</a>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Savat</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Savat</h1>
          {rows.length > 0 && <p className={styles.count}>{rows.length} xil material</p>}
        </header>

        {rows.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <ShoppingBasket size={32} />
            </span>
            <h2 className={styles.emptyTitle}>Savatingiz bo'sh</h2>
            <p className={styles.emptyText}>Materiallar kartochkasidagi savat tugmasi orqali mahsulot qo'shing.</p>
            <Button href="/#catalog">Materiallarni ko'rish</Button>
          </div>
        ) : (
          <div className={styles.layout}>
            <ul className={styles.list}>
              {rows.map(({ material, quantity, value, error }) => (
                <li key={material.id} className={styles.row}>
                  <Link to={`/materials/${material.id}`} className={styles.thumb}>
                    <MaterialImage material={material} />
                  </Link>

                  <div className={styles.info}>
                    <Link to={`/materials/${material.id}`} className={styles.name}>
                      {material.name}
                    </Link>
                    <span className={styles.meta}>
                      {material.category} · {formatRegion(material.region)}
                    </span>
                    <span className={styles.unitPrice}>
                      {formatPrice(material.price)} / 1 {material.unit}
                    </span>
                  </div>

                  <div className={styles.quantity}>
                    <QuantitySelector
                      id={`cart-quantity-${material.id}`}
                      value={value}
                      onChange={(next) => changeQuantity(material.id, next, material.quantity, material.unit)}
                      max={material.quantity}
                      unit={material.unit}
                      error={error}
                    />
                  </div>

                  <div className={styles.lineEnd}>
                    <span className={styles.lineTotal}>{formatPrice(quantity * material.price)}</span>
                    <button
                      type="button"
                      className={styles.remove}
                      aria-label={`“${material.name}” ni savatdan o'chirish`}
                      onClick={() => remove(material.id)}
                    >
                      <Trash2 size={18} />
                      <span>O'chirish</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Buyurtma</h2>
              <dl className={styles.summaryList}>
                {rows.map(({ material, quantity }) => (
                  <div key={material.id}>
                    <dt>
                      {material.name} × {quantity}
                    </dt>
                    <dd>{formatPrice(quantity * material.price)}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.summaryTotal}>
                <span>Jami</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className={styles.delivery}>
                <Truck size={18} />
                Taxminan {delivery.days} kunda yetkaziladi
              </p>
              {hasErrors && <p className={styles.summaryError}>Miqdorlardagi xatolarni to'g'rilang.</p>}
              <button
                type="button"
                className={styles.checkout}
                disabled={hasErrors}
                onClick={() => setCheckoutOpen(true)}
              >
                Barchasini xarid qilish
              </button>
              <button type="button" className={styles.clear} onClick={clearCart}>
                Savatni tozalash
              </button>
            </aside>
          </div>
        )}
      </div>

      {/* Modal savat bo'shagandan keyin ham (muvaffaqiyat oynasi uchun) ochiq qolishi kerak */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={rows.map(({ material, quantity }) => ({ material, quantity }))}
        onOrderPlaced={() => {
          clearCart();
          setDrafts({});
        }}
      />
    </section>
  );
}
