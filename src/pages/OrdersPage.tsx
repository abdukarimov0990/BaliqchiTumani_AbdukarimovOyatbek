import { CalendarClock, ChevronRight, ClipboardList, MapPin, Phone, Truck } from "lucide-react";
import { CategoryIcon } from "../components/ui/CategoryIcon";
import { Button } from "../components/ui/Button";
import { orderStatusLabels } from "../config/orders";
import { useShop } from "../store/useShop";
import type { Order } from "../types/order";
import { formatPrice } from "../utils/format";
import { formatDateTime, formatPhone } from "../utils/order";
import styles from "./OrdersPage.module.css";

export function OrdersPage() {
  const { orders } = useShop();

  return (
    <section className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Sahifa yo'li">
          <a href="/">Bosh sahifa</a>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">Buyurtmalarim</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>Buyurtmalarim</h1>
          {orders.length > 0 && <p className={styles.count}>{orders.length} ta buyurtma</p>}
        </header>

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <ClipboardList size={32} />
            </span>
            <h2 className={styles.emptyTitle}>Hali buyurtma yo'q</h2>
            <p className={styles.emptyText}>Rasmiylashtirilgan buyurtmalaringiz shu yerda ko'rinadi.</p>
            <Button href="/#catalog">Materiallarni ko'rish</Button>
          </div>
        ) : (
          <ul className={styles.list}>
            {orders.map((order) => (
              <OrderCard key={order.number} order={order} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <li className={styles.card}>
      <header className={styles.cardHeader}>
        <div>
          <span className={styles.number}>{order.number}</span>
          <span className={styles.date}>{formatDateTime(order.createdAt)}</span>
        </div>
        <span className={`${styles.status} ${styles[order.status]}`}>
          <Truck size={16} />
          {orderStatusLabels[order.status]}
        </span>
      </header>

      <ul className={styles.lines}>
        {order.lines.map((line) => (
          <li key={line.materialId} className={styles.line}>
            <span className={styles.lineThumb}>
              {line.image ? <img src={line.image} alt="" /> : <CategoryIcon category={line.category} size={20} />}
            </span>
            <span className={styles.lineInfo}>
              <span className={styles.lineName}>{line.name}</span>
              <span className={styles.lineMeta}>
                {line.quantity} {line.unit} × {formatPrice(line.price)}
              </span>
            </span>
            <span className={styles.lineTotal}>{formatPrice(line.quantity * line.price)}</span>
          </li>
        ))}
      </ul>

      <footer className={styles.cardFooter}>
        <ul className={styles.details}>
          <li>
            <CalendarClock size={16} />
            Taxminan {order.deliveryDays} kun · {order.deliveryDate}
          </li>
          <li>
            <MapPin size={16} />
            {order.customer.address}
          </li>
          <li>
            <Phone size={16} />
            +998 {formatPhone(order.customer.phone)}
          </li>
        </ul>
        <div className={styles.total}>
          <span>Jami</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>
      </footer>
    </li>
  );
}
