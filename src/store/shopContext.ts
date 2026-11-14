import { createContext } from "react";
import type { Material } from "../types/material";
import type { CartItem, Customer, Order } from "../types/order";

/** Savatga qo'shish natijasi. */
export type AddToCartResult =
  /** To'liq qo'shildi */
  | "added"
  /** Mavjud miqdordan oshib ketgani uchun qisman qo'shildi */
  | "capped"
  /** Savatda allaqachon mavjud miqdorning hammasi bor */
  | "full";

export interface OrderInput {
  material: Material;
  quantity: number;
}

export interface Toast {
  id: number;
  message: string;
  /** Xabar yonidagi link, masalan "Savatga o'tish" */
  link?: { label: string; to: string };
  tone?: "success" | "error";
}

export interface ShopContextValue {
  cart: CartItem[];
  /** Savatdagi turli materiallar soni */
  cartCount: number;
  addToCart: (material: Material, quantity: number) => AddToCartResult;
  setCartQuantity: (materialId: string, quantity: number) => void;
  removeFromCart: (materialId: string) => void;
  clearCart: () => void;

  orders: Order[];
  placeOrder: (items: OrderInput[], customer: Customer, deliveryDate: string) => Order;

  toast: Toast | null;
  notify: (toast: Omit<Toast, "id">) => void;
  dismissToast: () => void;
}

export const ShopContext = createContext<ShopContextValue | null>(null);
