import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  defaultValue?: string;
  autoFocus?: boolean;
  /** Qidiruv yuborilgandan keyin (masalan, header panelini yopish uchun) */
  onSearch?: () => void;
}

/** Material nomi bo'yicha qidiruv maydoni. Natijalar /search sahifasida ochiladi. */
export function SearchBar({ defaultValue = "", autoFocus, onSearch }: SearchBarProps) {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    onSearch?.();
  }

  return (
    <form className={styles.form} role="search" onSubmit={handleSubmit}>
      <label htmlFor="material-search" className="visually-hidden">
        Material nomi
      </label>
      <div className={styles.field}>
        <Search size={20} className={styles.icon} aria-hidden="true" />
        <input
          // defaultValue o'zgarganda (yangi qidiruv) maydon yangilanishi uchun
          key={defaultValue}
          id="material-search"
          name="q"
          type="search"
          className={styles.input}
          placeholder="Material nomini kiriting"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          autoComplete="off"
        />
      </div>
      <button type="submit" className={styles.button}>
        <Search size={18} className={styles.buttonIcon} aria-hidden="true" />
        <span>Qidirish</span>
      </button>
    </form>
  );
}
