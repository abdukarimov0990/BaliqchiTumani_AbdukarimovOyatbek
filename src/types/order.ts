/** Savatdagi bitta qator. */
export interface CartItem {
  materialId: string;
  quantity: number;
}

/** Buyurtmachi ma'lumotlari. */
export interface Customer {
  name: string;
  /** +998 dan keyingi 9 ta raqam */
  phone: string;
  address: string;
  comment: string;
}

export type OrderStatus = "delivering" | "delivered" | "cancelled";

/**
 * Buyurtmadagi material. Material ma'lumotlari buyurtma paytidagi holatida saqlanadi,
 * keyin katalog o'zgarsa ham buyurtma tarixi o'zgarmaydi.
 */
export interface OrderLine {
  materialId: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  number: string;
  /** ISO sana-vaqt */
  createdAt: string;
  lines: OrderLine[];
  total: number;
  deliveryDays: number;
  /** Kutilayotgan sana, masalan "17-noyabr" */
  deliveryDate: string;
  customer: Customer;
  status: OrderStatus;
}
