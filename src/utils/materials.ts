import { materials } from "../data/materials";
import type { Material, MaterialField, MaterialIssue } from "../types/material";

/** Barcha materiallar. Keyinchalik filtr va qidiruv shu modulga qo'shiladi. */
export function getAllMaterials(): Material[] {
  return materials;
}

export function getMaterialById(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

/** Aniqlashtirish talab qiladigan materiallar. */
export function getMaterialsWithIssues(): Material[] {
  return materials.filter((m) => m.issues.length > 0);
}

/** Berilgan maydon bo'yicha aniqlashtirish izohi (bo'lmasa undefined). */
export function getIssue(material: Material, field: MaterialField): MaterialIssue | undefined {
  return material.issues.find((issue) => issue.field === field);
}

/** Takrorlanmas toifalar ro'yxati (ma'lumotdagi tartibda). */
export function getCategories(): string[] {
  return [...new Set(materials.map((m) => m.category))];
}

/** Ma'lum bo'lgan hududlar ro'yxati (noma'lumlari hisobga olinmaydi). */
export function getRegions(): string[] {
  return [...new Set(materials.flatMap((m) => (m.region ? [m.region] : [])))];
}

/** Toifadagi materiallar soni. */
export function countByCategory(category: string): number {
  return materials.filter((m) => m.category === category).length;
}

/** O'zbekcha tutuq belgilarining turli yozilishini bittaga keltiradi (o‘, o', oʻ, o`). */
function normalize(text: string): string {
  return text.toLowerCase().replace(/[‘’ʻʼ`´]/g, "'").trim();
}

/** Material nomi yoki toifasi bo'yicha qidiruv. Bo'sh so'rov — barcha materiallar. */
export function searchMaterials(query: string): Material[] {
  const q = normalize(query);
  if (!q) return materials;
  return materials.filter((m) => normalize(m.name).includes(q) || normalize(m.category).includes(q));
}

/** Filtr qiymatlari. `null` — shu bo'yicha filtrlanmaydi ("Barchasi"). */
export interface MaterialFilter {
  category: string | null;
  /** UNKNOWN_REGION — hududi noma'lum materiallar */
  region: string | null;
}

/** Hududi noma'lum materiallar uchun filtr qiymati. */
export const UNKNOWN_REGION = "__unknown__";

/** Hudud filtri uchun variantlar: ma'lum hududlar alifbo tartibida, noma'lumi bo'lsa — oxirida. */
export function getRegionOptions(): { value: string; label: string }[] {
  const options = getRegions()
    .sort((a, b) => a.localeCompare(b))
    .map((region) => ({ value: region, label: region }));

  if (materials.some((m) => m.region === null)) {
    options.push({ value: UNKNOWN_REGION, label: "Noma'lum" });
  }
  return options;
}

/** Materiallarni toifa va hudud bo'yicha filtrlaydi. */
export function filterMaterials(list: Material[], { category, region }: MaterialFilter): Material[] {
  return list.filter((m) => {
    if (category && m.category !== category) return false;
    if (region === UNKNOWN_REGION) return m.region === null;
    if (region && m.region !== region) return false;
    return true;
  });
}
