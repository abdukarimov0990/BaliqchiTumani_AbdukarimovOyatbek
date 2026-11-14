import { ShoppingBasket } from "lucide-react";
import { useShop } from "../../store/useShop";
import type { Material } from "../../types/material";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
  material: Material;
  /** Qo'shiladigan miqdor */
  quantity?: number;
  disabled?: boolean;
}

/** Savatga qo'shish tugmasi (faqat ikonka). Natija haqida pastda bildirishnoma chiqadi. */
export function AddToCartButton({ material, quantity = 1, disabled }: AddToCartButtonProps) {
  const { addToCart, notify, cart } = useShop();
  const inCart = cart.some((item) => item.materialId === material.id);

  function handleClick() {
    const result = addToCart(material, quantity);
    const link = { label: "Savatga o'tish", to: "/cart" };

    if (result === "added") {
      notify({ message: `“${material.name}” savatga qo'shildi`, link, tone: "success" });
    } else if (result === "capped") {
      notify({
        message: `Savatga qo'shildi. Mavjud miqdor ${material.quantity} ${material.unit} bo'lgani uchun savatda shuncha qoldi.`,
        link,
        tone: "success",
      });
    } else {
      notify({
        message: `Savatda “${material.name}” ning barcha mavjud miqdori (${material.quantity} ${material.unit}) bor.`,
        link,
        tone: "error",
      });
    }
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${inCart ? styles.inCart : ""}`}
      aria-label={`“${material.name}” ni savatga qo'shish`}
      title="Savatga qo'shish"
      disabled={disabled}
      onClick={handleClick}
    >
      <ShoppingBasket size={22} />
    </button>
  );
}
