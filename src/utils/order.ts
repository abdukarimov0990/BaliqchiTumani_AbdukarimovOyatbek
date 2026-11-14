import type { Customer } from "../types/order";

export type CustomerErrors = Partial<Record<keyof Customer, string>>;

export const emptyCustomer: Customer = { name: "", phone: "", address: "", comment: "" };

/** Telefondan faqat raqamlarni qoldiradi (ko'pi bilan 9 ta). */
export function cleanPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

/** "901234567" → "90 123 45 67" */
export function formatPhone(digits: string): string {
  return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean).join(" ");
}

/** Buyurtmachi formasini tekshiradi. Xatolar bo'lmasa — bo'sh obyekt. */
export function validateCustomer(form: Customer): CustomerErrors {
  const errors: CustomerErrors = {};

  if (form.name.trim().length < 3) errors.name = "Ism va familiyangizni kiriting (kamida 3 ta harf).";
  if (cleanPhone(form.phone).length !== 9) errors.phone = "Telefon raqamini to'liq kiriting: 9 ta raqam.";
  if (form.address.trim().length < 5) errors.address = "Yetkazib berish manzilini to'liq kiriting.";

  return errors;
}

const MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

/** Bugundan `days` kun keyingi sana, masalan "17-noyabr". */
export function getDeliveryDate(days: number, from: Date = new Date()): string {
  const date = new Date(from);
  date.setDate(date.getDate() + days);
  return `${date.getDate()}-${MONTHS[date.getMonth()]}`;
}

/** Buyurtma raqami, masalan "QM-4F8K2A". */
export function createOrderNumber(): string {
  return `QM-${Date.now().toString(36).slice(-6).toUpperCase()}`;
}

/** ISO sanani "14-noyabr, 12:30" ko'rinishiga keltiradi. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  return `${date.getDate()}-${MONTHS[date.getMonth()]}, ${time}`;
}
