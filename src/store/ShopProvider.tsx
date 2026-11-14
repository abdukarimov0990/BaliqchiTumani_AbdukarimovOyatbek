import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { delivery } from "../config/delivery";
import { DEFAULT_ORDER_STATUS } from "../config/orders";
import type { Material } from "../types/material";
import type { CartItem, Customer, Order } from "../types/order";
import { createOrderNumber } from "../utils/order";
import { getMaterialById } from "../utils/materials";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { ShopContext, type AddToCartResult, type OrderInput, type ShopContextValue, type Toast } from "./shopContext";

const CART_KEY = "qurilish-market:cart";
const ORDERS_KEY = "qurilish-market:orders";
const TOAST_DURATION = 3000;

const isArray = (value: unknown): value is never[] => Array.isArray(value);

/** Katalogda yo'q materiallar savatdan chiqarib tashlanadi. */
function loadCart(): CartItem[] {
  return loadFromStorage<CartItem[]>(CART_KEY, [], isArray).filter((item) => getMaterialById(item.materialId));
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage<Order[]>(ORDERS_KEY, [], isArray));
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => saveToStorage(CART_KEY, cart), [cart]);
  useEffect(() => saveToStorage(ORDERS_KEY, orders), [orders]);

  const notify = useCallback((next: Omit<Toast, "id">) => {
    window.clearTimeout(toastTimer.current);
    setToast({ ...next, id: Date.now() });
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const addToCart = useCallback(
    (material: Material, quantity: number): AddToCartResult => {
      const current = cart.find((item) => item.materialId === material.id)?.quantity ?? 0;
      const next = Math.min(current + quantity, material.quantity);
      if (next === current) return "full";

      setCart((prev) =>
        current === 0
          ? [...prev, { materialId: material.id, quantity: next }]
          : prev.map((item) => (item.materialId === material.id ? { ...item, quantity: next } : item)),
      );
      return next === current + quantity ? "added" : "capped";
    },
    [cart],
  );

  const setCartQuantity = useCallback((materialId: string, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.materialId === materialId ? { ...item, quantity } : item)));
  }, []);

  const removeFromCart = useCallback((materialId: string) => {
    setCart((prev) => prev.filter((item) => item.materialId !== materialId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback((items: OrderInput[], customer: Customer, deliveryDate: string): Order => {
    const lines = items.map(({ material, quantity }) => ({
      materialId: material.id,
      name: material.name,
      category: material.category,
      unit: material.unit,
      price: material.price,
      quantity,
      image: material.image,
    }));

    const order: Order = {
      number: createOrderNumber(),
      createdAt: new Date().toISOString(),
      lines,
      total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
      deliveryDays: delivery.days,
      deliveryDate,
      customer: { ...customer, name: customer.name.trim(), address: customer.address.trim(), comment: customer.comment.trim() },
      status: DEFAULT_ORDER_STATUS,
    };

    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      cartCount: cart.length,
      addToCart,
      setCartQuantity,
      removeFromCart,
      clearCart,
      orders,
      placeOrder,
      toast,
      notify,
      dismissToast,
    }),
    [cart, addToCart, setCartQuantity, removeFromCart, clearCart, orders, placeOrder, toast, notify, dismissToast],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
