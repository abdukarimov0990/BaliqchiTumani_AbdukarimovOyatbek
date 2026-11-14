import { useEffect } from "react";
import { useLocation } from "react-router";

/** Boshqa sahifaga o'tilganda sahifa boshidan ko'rsatiladi (#bo'lim linklaridan tashqari). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
