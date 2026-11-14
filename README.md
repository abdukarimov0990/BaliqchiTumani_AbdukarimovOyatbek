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
  main.tsx                     — kirish nuqtasi
  App.tsx                      — asosiy komponent
  index.css                    — umumiy uslublar
  types/material.ts            — Material tipi
  data/materials.ts            — materiallar ma'lumoti (shu yerda tahrirlanadi)
  utils/materials.ts           — ma'lumot bilan ishlash funksiyalari
  utils/format.ts              — narx va hududni formatlash
  components/MaterialTable.tsx — materiallar jadvali
```

## Aniqlashtirish kerak

| Kod | Maydon | Holat |
|-----|--------|-------|
| Q04 | Hudud  | Noma'lum (`region: null`) |
| Q06 | Narx   | 65 000 so'm — tasdiqlanmagan |

Bu belgilar `data/materials.ts` dagi `issues` maydonida saqlanadi va sahifada ⚠ bilan ko'rsatiladi.
