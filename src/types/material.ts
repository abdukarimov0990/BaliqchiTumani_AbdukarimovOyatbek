/** Aniqlashtirish talab qilishi mumkin bo'lgan maydonlar. */
export type MaterialField = "price" | "region";

/** Ma'lumotdagi aniqlashtirilishi kerak bo'lgan joy. */
export interface MaterialIssue {
  field: MaterialField;
  note: string;
}

export interface Material {
  /** Noyob kod (Q01, Q02, ...) */
  id: string;
  name: string;
  category: string;
  /** Mavjud miqdor */
  quantity: number;
  /** O'lchov birligi (dona, banka, ...) */
  unit: string;
  /** Narx, so'mda */
  price: number;
  /** Hudud; noma'lum bo'lsa null */
  region: string | null;
  /** Aniqlashtirilishi kerak bo'lgan maydonlar (bo'lmasa bo'sh) */
  issues: MaterialIssue[];
}
