import { CircleAlert, CircleCheck, X } from "lucide-react";
import { Link } from "react-router";
import { useShop } from "../../store/useShop";
import styles from "./Toast.module.css";

/** Ekran pastidagi qisqa bildirishnoma (masalan, "savatga qo'shildi"). */
export function Toast() {
  const { toast, dismissToast } = useShop();

  return (
    <div className={styles.region} aria-live="polite">
      {toast && (
        <div key={toast.id} className={`${styles.toast} ${toast.tone === "error" ? styles.error : ""}`} role="status">
          <span className={styles.icon}>
            {toast.tone === "error" ? <CircleAlert size={20} /> : <CircleCheck size={20} />}
          </span>
          <span className={styles.message}>{toast.message}</span>
          {toast.link && (
            <Link to={toast.link.to} className={styles.link} onClick={dismissToast}>
              {toast.link.label}
            </Link>
          )}
          <button type="button" className={styles.close} aria-label="Yopish" onClick={dismissToast}>
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
