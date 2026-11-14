/**
 * Bosh sahifadagi bannerlar.
 *
 * Rasmni almashtirish: faylni public/banners/ papkasiga qo'ying va `image` yo'lini o'zgartiring.
 * Rasm o'lchami: 2048 × 768 px (8:3 nisbat).
 */
export interface Banner {
  id: string;
  image: string;
  /** Rasm tavsifi (ekran o'quvchilar va rasm yuklanmaganda) */
  alt: string;
}

export const banners: Banner[] = [
  { id: "banner-1", image: "/banners/Banner1.png", alt: "Kafellar arzon narxda" },
  { id: "banner-2", image: "/banners/Banner2.png", alt: "Yangidek bo'yoqlarni ulgurji narxda xarid qiling" },
  { id: "banner-3", image: "/banners/Banner3.png", alt: "Yog'ochlar arzon narxda" },
];
