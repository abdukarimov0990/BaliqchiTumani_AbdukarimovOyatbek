import { BrickWall, LayoutGrid, Package, PaintRoller, TreePine, type LucideIcon } from "lucide-react";

/** "Barchasi" bandi uchun nom. */
export const ALL_CATEGORIES = "Barchasi";

/** Toifa nomi → ikonka. Yangi toifa qo'shilsa, shu yerga ikonkasini yozing. */
const categoryIcons: Record<string, LucideIcon> = {
  [ALL_CATEGORIES]: LayoutGrid,
  Kafel: BrickWall,
  "Yog'och": TreePine,
  "Bo'yoq": PaintRoller,
};

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? Package;
}
