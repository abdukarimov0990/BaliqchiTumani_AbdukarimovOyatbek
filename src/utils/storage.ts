/**
 * localStorage bilan xavfsiz ishlash: maxfiy rejimda yoki bloklangan holatda
 * xato bermaydi, shunchaki boshlang'ich qiymat qaytaradi.
 */
export function loadFromStorage<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Saqlab bo'lmasa ham sayt ishlashda davom etadi
  }
}
