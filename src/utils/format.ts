/** 15000 -> "15 000 so'm" */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ru-RU").replace(/ /g, " ")} so'm`;
}

/** null -> "Noma'lum" */
export function formatRegion(region: string | null): string {
  return region ?? "Noma'lum";
}
