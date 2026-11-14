/** Sayt bo'yicha umumiy sozlamalar: nom, menyu bo'limlari, header'dagi ma'lumot bloklari. */
export const site = {
  name: { primary: "Qurilish", accent: "Market" },
  tagline: "Ta'mirdan ortgan qurilish materiallari savdosi",
  nav: [
    { label: "Bosh sahifa", href: "/#top" },
    { label: "Materiallar", href: "/#catalog" },
    { label: "Biz haqimizda", href: "/#about" },
    { label: "Aloqa", href: "/#contact" },
  ],
  // Telefon va ish vaqti hozircha namuna sifatida — haqiqiy ma'lumot bilan almashtirilishi kerak
  info: [
    { icon: "store", label: "Biz sotamiz", value: "Qurilish materiallari" },
    { icon: "phone", label: "Aloqa raqami", value: "+998 90 000 00 00", href: "tel:+998900000000" },
    { icon: "clock", label: "Ish vaqti", value: "Du–Sh, 9:00–18:00" },
  ],
} as const;

export type SiteInfoIcon = (typeof site.info)[number]["icon"];
