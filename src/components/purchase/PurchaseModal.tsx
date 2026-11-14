import { useState, type FormEvent, type ReactNode } from "react";
import { CircleCheck, MapPin, Truck } from "lucide-react";
import { delivery } from "../../config/delivery";
import type { Material } from "../../types/material";
import { formatPrice, formatRegion } from "../../utils/format";
import {
  cleanPhone,
  createOrderNumber,
  emptyOrderForm,
  formatPhone,
  getDeliveryDate,
  validateOrderForm,
  type OrderForm,
} from "../../utils/order";
import { validateQuantity } from "../../utils/quantity";
import { MaterialImage } from "../materials/MaterialImage";
import { QuantitySelector } from "../materials/QuantitySelector";
import { Modal } from "../ui/Modal";
import styles from "./PurchaseModal.module.css";

interface PurchaseModalProps {
  material: Material;
  open: boolean;
  onClose: () => void;
  /** Modal ochilgandagi boshlang'ich miqdor */
  initialQuantity?: number;
}

export function PurchaseModal({ material, open, onClose, initialQuantity = 1 }: PurchaseModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Xaridni rasmiylashtirish">
      {/* Har safar ochilganda forma qaytadan boshlanadi */}
      {open && <PurchaseFlow material={material} initialQuantity={initialQuantity} onClose={onClose} />}
    </Modal>
  );
}

interface CompletedOrder {
  number: string;
  quantity: number;
  total: number;
  deliveryDate: string;
  form: OrderForm;
}

function PurchaseFlow({
  material,
  initialQuantity,
  onClose,
}: {
  material: Material;
  initialQuantity: number;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(String(initialQuantity));
  const [form, setForm] = useState<OrderForm>(emptyOrderForm);
  // Xatolar birinchi urinishdan keyin ko'rsatiladi va shundan so'ng yozish jarayonida yangilanib boradi
  const [attempted, setAttempted] = useState(false);
  const [order, setOrder] = useState<CompletedOrder | null>(null);
  const [deliveryDate] = useState(() => getDeliveryDate(delivery.days));

  const quantityError = validateQuantity(quantity, material.quantity, material.unit);
  const formErrors = attempted ? validateOrderForm(form) : {};
  const total = quantityError ? null : Number(quantity) * material.price;

  const update = (field: keyof OrderForm, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    const errors = validateOrderForm(form);
    if (quantityError || Object.keys(errors).length > 0) {
      // Birinchi xato maydonga o'tamiz
      const firstInvalid = quantityError ? "purchase-quantity" : `order-${Object.keys(errors)[0]}`;
      const field = document.getElementById(firstInvalid);
      field?.focus({ preventScroll: true });
      // Pastki qotib turgan panel ortida qolib ketmasligi uchun o'rtaga aylantiriladi
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setOrder({ number: createOrderNumber(), quantity: Number(quantity), total: total ?? 0, deliveryDate, form });
  }

  if (order) {
    return <OrderSuccess material={material} order={order} onClose={onClose} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.content}>
        {/* ---------- Xarid ma'lumotlari ---------- */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Xarid ma'lumotlari</h3>

          <div className={styles.product}>
            <div className={styles.thumb}>
              <MaterialImage material={material} />
            </div>
            <div className={styles.productInfo}>
              <span className={styles.productName}>{material.name}</span>
              <span className={styles.productMeta}>
                {material.category} · <MapPin size={13} /> {formatRegion(material.region)}
              </span>
              <span className={styles.productPrice}>
                {formatPrice(material.price)} <span>/ 1 {material.unit}</span>
              </span>
            </div>
          </div>

          <QuantitySelector
            id="purchase-quantity"
            value={quantity}
            onChange={setQuantity}
            max={material.quantity}
            unit={material.unit}
            error={quantityError}
          />

          <dl className={styles.summary}>
            <div>
              <dt>1 {material.unit} narxi</dt>
              <dd>{formatPrice(material.price)}</dd>
            </div>
            <div>
              <dt>Miqdor</dt>
              <dd>{quantityError ? "—" : `${quantity} ${material.unit}`}</dd>
            </div>
            <div className={styles.summaryTotal}>
              <dt>Jami</dt>
              <dd>{total === null ? "—" : formatPrice(total)}</dd>
            </div>
          </dl>

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

          <Field id="order-name" label="Ism va familiya" error={formErrors.name}>
            <input
              id="order-name"
              className={styles.input}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Masalan: Aziz Karimov"
              autoComplete="name"
              aria-invalid={Boolean(formErrors.name)}
            />
          </Field>

          <Field id="order-phone" label="Telefon raqami" error={formErrors.phone}>
            <div className={`${styles.phone} ${formErrors.phone ? styles.invalid : ""}`}>
              <span className={styles.phonePrefix}>+998</span>
              <input
                id="order-phone"
                type="tel"
                inputMode="numeric"
                className={styles.phoneInput}
                value={formatPhone(form.phone)}
                onChange={(e) => update("phone", cleanPhone(e.target.value))}
                placeholder="90 123 45 67"
                autoComplete="tel-national"
                aria-invalid={Boolean(formErrors.phone)}
              />
            </div>
          </Field>

          <Field id="order-address" label="Yetkazib berish manzili" error={formErrors.address}>
            <textarea
              id="order-address"
              className={`${styles.input} ${styles.textarea}`}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Tuman, ko'cha, uy raqami"
              rows={2}
              autoComplete="street-address"
              aria-invalid={Boolean(formErrors.address)}
            />
          </Field>

          <Field id="order-comment" label="Izoh (ixtiyoriy)">
            <textarea
              id="order-comment"
              className={`${styles.input} ${styles.textarea}`}
              value={form.comment}
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

function OrderSuccess({ material, order, onClose }: { material: Material; order: CompletedOrder; onClose: () => void }) {
  const rows = [
    { label: "Material", value: material.name },
    { label: "Miqdor", value: `${order.quantity} ${material.unit}` },
    { label: "Jami to'lov", value: formatPrice(order.total) },
    { label: "Yetkazib berish", value: `Taxminan ${delivery.days} kun, ${order.deliveryDate}` },
    { label: "Buyurtmachi", value: order.form.name.trim() },
    { label: "Telefon", value: `+998 ${formatPhone(order.form.phone)}` },
    { label: "Manzil", value: order.form.address.trim() },
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

      <p className={styles.successNote}>Sotuvchi buyurtmani tasdiqlash uchun ko'rsatilgan raqam orqali bog'lanadi.</p>

      <button type="button" className={styles.submit} onClick={onClose}>
        Yopish
      </button>
    </div>
  );
}
