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
