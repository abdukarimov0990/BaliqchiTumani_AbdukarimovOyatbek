/**
 * Xaridor kiritgan miqdorni tekshiradi.
 * Xato bo'lsa — foydalanuvchiga ko'rsatiladigan matn, to'g'ri bo'lsa — null.
 */
export function validateQuantity(value: string, available: number, unit: string): string | null {
  if (value.trim() === "") return "Miqdorni kiriting.";

  const amount = Number(value);
  if (!Number.isInteger(amount)) return "Miqdor butun son bo'lishi kerak.";
  if (amount < 1) return `Miqdor kamida 1 ${unit} bo'lishi kerak.`;
  if (amount > available) return `Mavjud miqdordan ko'p kiritildi. Eng ko'pi bilan ${available} ${unit} olish mumkin.`;

  return null;
}
