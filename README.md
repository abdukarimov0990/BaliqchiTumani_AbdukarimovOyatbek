# Qurilishdan ortgan materiallar savdosi

Ta'mirdan ortib qolgan qurilish materiallarini oz miqdorda sotish uchun sayt.

## Texnologiyalar

React + TypeScript, Vite orqali yig'iladi.

## Ishga tushirish

```bash
npm install
npm run dev      # ishlab chiqish serveri
npm run build    # tip tekshiruvi + production build
npm run lint     # oxlint
```

## Tuzilma

```
src/
  main.tsx                         — kirish nuqtasi
  App.tsx                          — header, sahifalar (marshrutlar), footer
  pages/HomePage.tsx               — bosh sahifa (/)
  pages/SearchPage.tsx             — qidiruv natijalari (/search?q=...)
  pages/MaterialPage.tsx           — material sahifasi, miqdor tanlash (/materials/:id)
  pages/CategoryPage.tsx           — toifa sahifasi (/category/kafel, /category/barchasi)
  config/site.ts                   — sayt nomi, menyu, header ma'lumotlari
  config/banners.ts                — bosh sahifa bannerlari
  config/categories.ts             — toifa ikonkalari va manzillari
  config/delivery.ts               — yetkazib berish muddati (kunlarda)
  styles/tokens.css                — dizayn tokenlari (ranglar, shriftlar, oraliqlar)
  styles/global.css                — umumiy uslublar va shriftlarni ulash
  types/material.ts                — Material tipi
  data/materials.ts                — materiallar ma'lumoti (shu yerda tahrirlanadi)
  utils/                           — ma'lumot, qidiruv, formatlash, miqdor va buyurtmani tekshirish
  components/ui/                   — Button, Logo, SectionHeader, CategoryIcon, Modal
  components/purchase/             — PurchaseModal (xaridni rasmiylashtirish)
  components/layout/               — Header, Footer
  components/hero/                 — BannerSlider, CategoryBar
  components/search/               — SearchBar (header'dagi qidiruv)
  components/sections/             — Hero, Catalog
  components/materials/            — MaterialCard, MaterialGrid, MaterialImage, MaterialFilters, QuantitySelector
```

Har bir komponentning uslubi yonidagi `*.module.css` faylida.

## Bannerlar

Bannerlar ro'yxati `src/config/banners.ts` da, rasmlar `public/banners/` papkasida.
Rasmni almashtirish uchun faylni shu papkaga qo'yib, `image` yo'lini o'zgartiring.
Rasm o'lchami: 2048 × 768 px (8:3). Bannerlar har 5 soniyada aylanib almashadi.

## Ranglar

| Token | Rang | Qayerda |
|-------|------|---------|
| `--color-accent` | #FFBE2E | asosiy tugmalar, logotip, aksentlar |
| `--color-navy` | #06132D | navigatsiya, footer, kontrast bloklar |
| `--color-white` | #FFFFFF | asosiy fon va kontent |
| `--color-gray-50` | #F4F5F7 | ikkilamchi fonlar |

## Aniqlashtirish kerak bo'lgan ma'lumotlar

Hozircha yo'q. Biror qiymat tasdiqlanmagan bo'lsa, `data/materials.ts` dagi
`issues` maydoniga yoziladi — kartochkada u qiymat ajratib ko'rsatiladi va izoh chiqadi.
