import { useState, type FormEvent, type ReactNode } from "react";
import { CircleCheck, MapPin, Truck } from "lucide-react";
import { Link } from "react-router";
import { delivery } from "../../config/delivery";
import { orderStatusLabels } from "../../config/orders";
import { useShop } from "../../store/useShop";
import type { OrderInput } from "../../store/shopContext";
import type { Customer, Order } from "../../types/order";
import { formatPrice, formatRegion } from "../../utils/format";
import {
  cleanPhone,
  emptyCustomer,
  formatPhone,
  getDeliveryDate,
  validateCustomer,
} from "../../utils/order";
import { validateQuantity } from "../../utils/quantity";
import { MaterialImage } from "../materials/MaterialImage";
import { QuantitySelector } from "../materials/QuantitySelector";
import { Modal } from "../ui/Modal";
import styles from "./CheckoutModal.module.css";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  /** Xarid qilinadigan materiallar va miqdorlari */
  items: OrderInput[];
  /** true — bitta material, miqdorini modal ichida o'zgartirish mumkin */
  editableQuantity?: boolean;
  /** Buyurtma muvaffaqiyatli rasmiylashtirilganda (masalan, savatni tozalash uchun) */
  onOrderPlaced?: (order: Order) => void;
}

/** Xaridni rasmiylashtirish oynasi: bitta material uchun ham, savatdagi barcha materiallar uchun ham. */
export function CheckoutModal({ open, onClose, items, editableQuantity, onOrderPlaced }: CheckoutModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Xaridni rasmiylashtirish">
      {/* Har safar ochilganda forma qaytadan boshlanadi */}
      {open && (
        <CheckoutFlow items={items} editableQuantity={editableQuantity} onClose={onClose} onOrderPlaced={onOrderPlaced} />
      )}
    </Modal>
  );
}

function CheckoutFlow({
  items,
  editableQuantity,
  onClose,
  onOrderPlaced,
}: Omit<CheckoutModalProps, "open">) {
  const { placeOrder } = useShop();
  const [quantities, setQuantities] = useState(() => items.map((item) => String(item.quantity)));
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  // Xatolar birinchi urinishdan keyin ko'rsatiladi va shundan so'ng yozish jarayonida yangilanib boradi
  const [attempted, setAttempted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [deliveryDate] = useState(() => getDeliveryDate(delivery.days));

  const quantityErrors = items.map((item, i) =>
    validateQuantity(quantities[i], item.material.quantity, item.material.unit),
  );
  const hasQuantityError = quantityErrors.some(Boolean);
  const customerErrors = attempted ? validateCustomer(customer) : {};
  const total = hasQuantityError
    ? null
    : items.reduce((sum, item, i) => sum + Number(quantities[i]) * item.material.price, 0);

  const update = (field: keyof Customer, value: string) => setCustomer((prev) => ({ ...prev, [field]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    const errors = validateCustomer(customer);
    if (hasQuantityError || Object.keys(errors).length > 0) {
      const firstInvalid = hasQuantityError ? "checkout-quantity" : `order-${Object.keys(errors)[0]}`;
      const field = document.getElementById(firstInvalid);
      field?.focus({ preventScroll: true });
      // Pastki qotib turgan panel ortida qolib ketmasligi uchun o'rtaga aylantiriladi
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const placed = placeOrder(
      items.map((item, i) => ({ material: item.material, quantity: Number(quantities[i]) })),
      customer,
      deliveryDate,
    );
    setOrder(placed);
    onOrderPlaced?.(placed);
  }

  if (order) {
    return <OrderSuccess order={order} onClose={onClose} />;
  }

  const single = editableQuantity && items.length === 1 ? items[0] : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.content}>
        {/* ---------- Xarid ma'lumotlari ---------- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Xarid ma'lumotlari</h3>

          {single ? (
            <>
              <div className={styles.product}>
                <div className={styles.thumb}>
                  <MaterialImage material={single.material} />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productName}>{single.material.name}</span>
                  <span className={styles.productMeta}>
                    {single.material.category} · <MapPin size={13} /> {formatRegion(single.material.region)}
                  </span>
                  <span className={styles.productPrice}>
                    {formatPrice(single.material.price)} <span>/ 1 {single.material.unit}</span>
                  </span>
                </div>
              </div>

              <QuantitySelector
                id="checkout-quantity"
                value={quantities[0]}
                onChange={(value) => setQuantities([value])}
                max={single.material.quantity}
                unit={single.material.unit}
                error={quantityErrors[0]}
              />

              <dl className={styles.summary}>
                <div>
                  <dt>1 {single.material.unit} narxi</dt>
                  <dd>{formatPrice(single.material.price)}</dd>
                </div>
                <div>
                  <dt>Miqdor</dt>
                  <dd>{quantityErrors[0] ? "—" : `${quantities[0]} ${single.material.unit}`}</dd>
                </div>
                <div className={styles.summaryTotal}>
                  <dt>Jami</dt>
                  <dd>{total === null ? "—" : formatPrice(total)}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <ul className={styles.lines}>
                {items.map((item, i) => (
                  <li key={item.material.id} className={styles.line}>
                    <div className={styles.lineThumb}>
                      <MaterialImage material={item.material} />
                    </div>
                    <div className={styles.lineInfo}>
                      <span className={styles.lineName}>{item.material.name}</span>
                      <span className={styles.lineMeta}>
                        {quantities[i]} {item.material.unit} × {formatPrice(item.material.price)}
                      </span>
                    </div>
                    <span className={styles.lineTotal}>
                      {formatPrice(Number(quantities[i]) * item.material.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className={styles.summary}>
                <div>
                  <dt>Materiallar</dt>
                  <dd>{items.length} xil</dd>
                </div>
                <div className={styles.summaryTotal}>
                  <dt>Jami</dt>
                  <dd>{total === null ? "—" : formatPrice(total)}</dd>
                </div>
              </dl>
            </>
          )}

          <div className={styles.delivery}>
            <span className={styles.deliveryIcon}>
              <Truck size={22} />
            </span>
            <div>
              <strong>Taxminan {delivery.days} kunda yetkaziladi</strong>
              <span>Kutilayotgan sana: {deliveryDate}</span>
            </div>
          </div>
        </section>

        {/* ---------- Buyurtmachi ma'lumotlari ---------- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Buyurtmachi ma'lumotlari</h3>

          <Field id="order-name" label="Ism va familiya" error={customerErrors.name}>
            <input
              id="order-name"
              className={styles.input}
              value={customer.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Masalan: Aziz Karimov"
              autoComplete="name"
              aria-invalid={Boolean(customerErrors.name)}
            />
          </Field>

          <Field id="order-phone" label="Telefon raqami" error={customerErrors.phone}>
            <div className={`${styles.phone} ${customerErrors.phone ? styles.invalid : ""}`}>
              <span className={styles.phonePrefix}>+998</span>
              <input
                id="order-phone"
                type="tel"
                inputMode="numeric"
                className={styles.phoneInput}
                value={formatPhone(customer.phone)}
                onChange={(e) => update("phone", cleanPhone(e.target.value))}
                placeholder="90 123 45 67"
                autoComplete="tel-national"
                aria-invalid={Boolean(customerErrors.phone)}
              />
            </div>
          </Field>

          <Field id="order-address" label="Yetkazib berish manzili" error={customerErrors.address}>
            <textarea
              id="order-address"
              className={`${styles.input} ${styles.textarea}`}
              value={customer.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Tuman, ko'cha, uy raqami"
              rows={2}
              autoComplete="street-address"
              aria-invalid={Boolean(customerErrors.address)}
            />
          </Field>

          <Field id="order-comment" label="Izoh (ixtiyoriy)">
            <textarea
              id="order-comment"
              className={`${styles.input} ${styles.textarea}`}
              value={customer.comment}
              onChange={(e) => update("comment", e.target.value)}
              placeholder="Masalan: qo'ng'iroq qilib keling"
              rows={2}
            />
          </Field>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerTotal}>
          <span>Jami to'lov</span>
          <strong>{total === null ? "—" : formatPrice(total)}</strong>
        </div>
        <button type="submit" className={styles.submit}>
          Xaridni rasmiylashtirish
        </button>
      </footer>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldInvalid : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function OrderSuccess({ order, onClose }: { order: Order; onClose: () => void }) {
  const rows = [
    ...order.lines.map((line) => ({
      label: line.name,
      value: `${line.quantity} ${line.unit} — ${formatPrice(line.price * line.quantity)}`,
    })),
    { label: "Jami to'lov", value: formatPrice(order.total) },
    { label: "Holati", value: orderStatusLabels[order.status] },
    { label: "Yetkazib berish", value: `Taxminan ${order.deliveryDays} kun, ${order.deliveryDate}` },
    { label: "Buyurtmachi", value: order.customer.name },
    { label: "Telefon", value: `+998 ${formatPhone(order.customer.phone)}` },
    { label: "Manzil", value: order.customer.address },
  ];

  return (
    <div className={styles.success}>
      <span className={styles.successIcon}>
        <CircleCheck size={40} />
      </span>
      <h3 className={styles.successTitle}>Buyurtma rasmiylashtirildi!</h3>
      <p className={styles.successText}>
        Buyurtma raqami: <strong>{order.number}</strong>
      </p>

      <dl className={styles.successList}>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.successNote}>Buyurtma holatini "Buyurtmalarim" bo'limida kuzatib borishingiz mumkin.</p>

      <div className={styles.successActions}>
        <Link to="/orders" className={styles.secondary} onClick={onClose}>
          Buyurtmalarim
        </Link>
        <button type="button" className={styles.submit} onClick={onClose}>
          Yopish
        </button>
      </div>
    </div>
  );
}
