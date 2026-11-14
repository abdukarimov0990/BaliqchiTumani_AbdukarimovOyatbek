import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { getCategoryIcon } from "../../config/categories";

interface CategoryIconProps extends LucideProps {
  category: string;
}

/** Toifaga mos ikonka (config/categories.ts dagi ro'yxatdan). */
export function CategoryIcon({ category, ...props }: CategoryIconProps) {
  return createElement(getCategoryIcon(category), props);
}
