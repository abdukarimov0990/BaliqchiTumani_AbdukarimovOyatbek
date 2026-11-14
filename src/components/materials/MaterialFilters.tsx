import { ChevronDown, Layers, MapPin, X } from "lucide-react";
import type { ReactNode } from "react";
import type { MaterialFilter } from "../../utils/materials";
import styles from "./MaterialFilters.module.css";

interface Option {
  value: string;
  label: string;
}

interface MaterialFiltersProps {
  filter: MaterialFilter;
  onChange: (filter: MaterialFilter) => void;
  categoryOptions: Option[];
  regionOptions: Option[];
  resultCount: number;
}

/** Bo'sh qiymat — "Barchasi" */
const ALL = "";

interface SelectFieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  allLabel: string;
  value: string | null;
  options: Option[];
  onChange: (value: string | null) => void;
}

function SelectField({ id, label, icon, allLabel, value, options, onChange }: SelectFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {icon}
        {label}
      </label>
      <div className={`${styles.selectWrap} ${value ? styles.active : ""}`}>
        <select
          id={id}
          className={styles.select}
          value={value ?? ALL}
          onChange={(event) => onChange(event.target.value || null)}
        >
          <option value={ALL}>{allLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
      </div>
    </div>
  );
}

/** Katalog filtrlari: toifa va hudud bo'yicha. */
export function MaterialFilters({ filter, onChange, categoryOptions, regionOptions, resultCount }: MaterialFiltersProps) {
  const isFiltered = filter.category !== null || filter.region !== null;

  return (
    <div className={styles.bar}>
      <div className={styles.fields}>
        <SelectField
          id="filter-category"
          label="Toifa"
          icon={<Layers size={16} />}
          allLabel="Barcha toifalar"
          value={filter.category}
          options={categoryOptions}
          onChange={(category) => onChange({ ...filter, category })}
        />
        <SelectField
          id="filter-region"
          label="Hudud"
          icon={<MapPin size={16} />}
          allLabel="Barcha hududlar"
          value={filter.region}
          options={regionOptions}
          onChange={(region) => onChange({ ...filter, region })}
        />
      </div>

      <div className={styles.summary}>
        <span className={styles.count} aria-live="polite">
          {resultCount} ta material
        </span>
        {isFiltered && (
          <button type="button" className={styles.reset} onClick={() => onChange({ category: null, region: null })}>
            <X size={16} />
            Tozalash
          </button>
        )}
      </div>
    </div>
  );
}
