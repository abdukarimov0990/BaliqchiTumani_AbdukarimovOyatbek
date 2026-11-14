import { useState } from "react";
import { ArrowRight, ClipboardList, Clock, Menu, Phone, Search, ShoppingBasket, Store, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useShop } from "../../store/useShop";
import { site, type SiteInfoIcon } from "../../config/site";
import { SearchBar } from "../search/SearchBar";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import styles from "./Header.module.css";

const infoIcons: Record<SiteInfoIcon, typeof Store> = {
  store: Store,
  phone: Phone,
  clock: Clock,
};

/** Header'dagi bitta ma'lumot bloki (ikonka + sarlavha + qiymat). */
function InfoItem({ item }: { item: (typeof site.info)[number] }) {
  const Icon = infoIcons[item.icon];
  const value = "href" in item ? <a href={item.href}>{item.value}</a> : item.value;

  return (
    <li className={styles.infoItem}>
      <span className={styles.infoIcon}>
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className={styles.infoText}>
        <span className={styles.infoLabel}>{item.label}</span>
        <span className={styles.infoValue}>{value}</span>
      </span>
    </li>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const { cartCount } = useShop();
  const closeMenu = () => setMenuOpen(false);

  // "Bosh sahifa" faqat bosh sahifada aktiv ko'rinadi
  const isCurrent = (index: number) => (pathname === "/" && index === 0 ? "page" : undefined);

  function toggleMenu() {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  }

  function toggleSearch() {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  }

  return (
    <>
      {/* Yuqori sariq qism: logotip va qisqa ma'lumotlar */}
      <header className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <Logo variant="light" />
          <ul className={styles.info}>
            {site.info.map((item) => (
              <InfoItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </header>

      {/* To'q ko'k navigatsiya paneli */}
      <nav className={styles.navbar} aria-label="Asosiy menyu">
        <div className={`container ${styles.navbarInner}`}>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span>Menyu</span>
          </button>

          <ul className={styles.navList}>
            {site.nav.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isCurrent(index)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.searchButton} ${searchOpen ? styles.searchButtonActive : ""}`}
              aria-expanded={searchOpen}
              aria-controls="header-search"
              aria-label={searchOpen ? "Qidiruvni yopish" : "Qidirish"}
              onClick={toggleSearch}
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <Link
              to="/orders"
              className={`${styles.searchButton} ${pathname === "/orders" ? styles.searchButtonActive : ""}`}
              aria-label="Buyurtmalarim"
              title="Buyurtmalarim"
            >
              <ClipboardList size={20} />
            </Link>
            <Link
              to="/cart"
              className={`${styles.searchButton} ${pathname === "/cart" ? styles.searchButtonActive : ""}`}
              aria-label={cartCount > 0 ? `Savat: ${cartCount} xil material` : "Savat"}
              title="Savat"
            >
              <ShoppingBasket size={20} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>
            <div className={styles.cta}>
              <Button href="/#catalog" icon={<ArrowRight size={16} />}>
                Materiallarni ko'rish
              </Button>
            </div>
          </div>
        </div>

        {/* Qidiruv paneli */}
        {searchOpen && (
          <div id="header-search" className={styles.searchPanel}>
            <div className="container">
              <SearchBar autoFocus onSearch={() => setSearchOpen(false)} />
            </div>
          </div>
        )}

        {/* Mobil menyu */}
        <div id="mobile-menu" className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          <div className="container">
            <ul className={styles.mobileNavList}>
              {site.nav.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.mobileNavLink}
                    aria-current={isCurrent(index)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className={styles.mobileInfo}>
              {site.info.map((item) => (
                <InfoItem key={item.label} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
