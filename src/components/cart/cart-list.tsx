"use client";

import { useCart } from "@/context/cart-context";
import { CartItem } from "./cart-item";

const CartList = () => {
  const { items, removeItem } = useCart();

  return (
    <div className="divide-y">
      {items.map((game) => (
        <CartItem key={game.id} game={game} handleRemove={removeItem} />
      ))}
    </div>
  );
};

export { CartList };
