import { Minus, Plus } from "lucide-react";
import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
  /** Input qiymati — yozish jarayonida bo'sh bo'lishi mumkinligi uchun satr */
  value: string;
  onChange: (value: string) => void;
  max: number;
  unit: string;
  error: string | null;
  /** Sahifada bir nechta selektor bo'lsa, har biriga alohida id */
  id?: string;
}

/** Miqdor tanlash: −/+ tugmalari va qo'lda kiritish maydoni. */
export function QuantitySelector({ value, onChange, max, unit, error, id = "quantity" }: QuantitySelectorProps) {
  const amount = Number(value) || 0;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        Miqdor
      </label>
      <div className={`${styles.stepper} ${error ? styles.invalid : ""}`}>
        <button
          type="button"
          className={styles.step}
          aria-label="Kamaytirish"
          disabled={amount <= 1}
          onClick={() => onChange(String(Math.min(amount - 1, max)))}
        >
          <Minus size={18} />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          step={1}
          className={styles.input}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-hint`}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className={styles.unit}>{unit}</span>
        <button
          type="button"
          className={styles.step}
          aria-label="Ko'paytirish"
          disabled={amount >= max}
          onClick={() => onChange(String(Math.max(amount + 1, 1)))}
        >
          <Plus size={18} />
        </button>
      </div>
      <p id={`${id}-hint`} className={error ? styles.error : styles.hint} role={error ? "alert" : undefined}>
        {error ?? `Mavjud: ${max} ${unit}`}
      </p>
    </div>
  );
}
