import { useContext } from "react";
import { ShopContext, type ShopContextValue } from "./shopContext";

/** Savat, buyurtmalar va bildirishnomalar. ShopProvider ichida ishlatiladi. */
export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop faqat ShopProvider ichida ishlatiladi");
  return context;
}
