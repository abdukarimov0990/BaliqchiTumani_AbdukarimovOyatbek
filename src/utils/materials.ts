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
