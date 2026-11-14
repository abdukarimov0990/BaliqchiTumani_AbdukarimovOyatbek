import type { OrderStatus } from "../types/order";

/** Buyurtma holatlari nomlari. Yangi buyurtma "delivering" holatida yaratiladi. */
export const orderStatusLabels: Record<OrderStatus, string> = {
  delivering: "Yetkazib berilmoqda",
  delivered: "Yetkazib berildi",
  cancelled: "Bekor qilindi",
};

export const DEFAULT_ORDER_STATUS: OrderStatus = "delivering";
