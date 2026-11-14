import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Berilsa, havola (<a>) sifatida chiziladi */
  href?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({ children, variant = "primary", size = "md", href, icon, fullWidth }: ButtonProps) {
  const className = [styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <button type="button" className={className}>
      {content}
    </button>
  );
}
