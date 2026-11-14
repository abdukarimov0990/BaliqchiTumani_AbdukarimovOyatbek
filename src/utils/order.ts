/** Xarid formasi maydonlari. */
export interface OrderForm {
  name: string;
  /** +998 dan keyingi 9 ta raqam */
  phone: string;
  address: string;
  comment: string;
}

export type OrderErrors = Partial<Record<keyof OrderForm, string>>;

export const emptyOrderForm: OrderForm = { name: "", phone: "", address: "", comment: "" };

/** Telefondan faqat raqamlarni qoldiradi (ko'pi bilan 9 ta). */
export function cleanPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

/** "901234567" → "90 123 45 67" */
export function formatPhone(digits: string): string {
  return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean).join(" ");
}

/** Formani tekshiradi. Xatolar bo'lmasa — bo'sh obyekt. */
export function validateOrderForm(form: OrderForm): OrderErrors {
  const errors: OrderErrors = {};

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
