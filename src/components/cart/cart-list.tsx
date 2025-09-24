"use client";

import { useCart } from "@/context/cart-context";
import { CartItem } from "./cart-item";

const CartList = () => {
  const { items, removeItem, itemsCount } = useCart();

  if (itemsCount === 0) {
    return (
      <div className="cart-item flex w-full gap-4 p-4 mb-8 rounded-md bg-primary-light text-secondary-dark">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="divide-y cart-list">
      {items.map((game) => (
        <CartItem key={game.id} game={game} handleRemove={removeItem} />
      ))}
    </div>
  );
};

export { CartList };
