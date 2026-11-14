import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import type { Banner } from "../../config/banners";
import styles from "./BannerSlider.module.css";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_SPEED = 700;

interface BannerSliderProps {
  banners: Banner[];
}

export function BannerSlider({ banners }: BannerSliderProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Autoplay, A11y]}
        slidesPerView={1}
        loop
        speed={TRANSITION_SPEED}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }}
        a11y={{ prevSlideMessage: "Oldingi banner", nextSlideMessage: "Keyingi banner" }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <img
              className={styles.image}
              src={banner.image}
              alt={banner.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Oldingi banner"
        onClick={() => swiper?.slidePrev()}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Keyingi banner"
        onClick={() => swiper?.slideNext()}
      >
        <ChevronRight size={22} />
      </button>

      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            aria-label={`${index + 1}-banner`}
            aria-current={index === activeIndex}
            onClick={() => swiper?.slideToLoop(index)}
          />
        ))}
      </div>
    </div>
  );
}
