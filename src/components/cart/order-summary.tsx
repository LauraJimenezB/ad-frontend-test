"use client";

import { useCart } from "@/context/cart-context";

const OrderSummary = () => {
  const { items, clearCart, itemsCount } = useCart();

  const total = items.reduce((sum, game) => sum + game.price, 0);

  return (
    <aside>
      <div className="order-container">
        <h2 className="order-title">Order Summary</h2>
        <span className="text-sm text-gray-500">{itemsCount} items</span>
        <div className="order-list">
          {items?.map((item, i) => {
            return (
              <div className="flex justify-between mb-3 text-gray-600" key={i}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between font-semibold mt-4">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full btn-primary mt-6" onClick={clearCart}>
        Checkout
      </button>
    </aside>
  );
};

export { OrderSummary };
