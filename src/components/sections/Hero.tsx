import { banners } from "../../config/banners";
import { BannerSlider } from "../hero/BannerSlider";
import { CategoryBar } from "../hero/CategoryBar";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <BannerSlider banners={banners} />
        <CategoryBar />
      </div>
    </section>
  );
}
