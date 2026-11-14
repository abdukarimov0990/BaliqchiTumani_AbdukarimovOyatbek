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

/** "Barchasi" sahifasi uchun manzil qismi. */
const ALL_CATEGORIES_SLUG = "barchasi";

/** Toifa nomidan manzil uchun qism: "Yog'och" → "yogoch". */
function slugify(category: string): string {
  return category
    .toLowerCase()
    .replace(/['‘’ʻʼ`]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Toifa sahifasining manzili. */
export function categoryPath(category: string): string {
  return `/category/${category === ALL_CATEGORIES ? ALL_CATEGORIES_SLUG : slugify(category)}`;
}

/** Manzildagi qismdan toifa nomini topadi (berilgan ro'yxat ichidan). Topilmasa — null. */
export function findCategoryBySlug(slug: string, categories: string[]): string | null {
  if (slug === ALL_CATEGORIES_SLUG) return ALL_CATEGORIES;
  return categories.find((category) => slugify(category) === slug) ?? null;
}
