"use client";

import { Game } from "@/types/game";
import Link from "next/link";

const OrderSummary = ({ count, items }: { count: number; items: Game[] }) => {
  const total = 10;
  return (
    <aside>
      <div className="order-container">
        <h2 className="order-title">Order Summary</h2>
        <span className="text-sm text-gray-500">{count} items</span>
        <div className="order-list">
          {items?.map((item) => {
            return (
              <div className="flex justify-between mb-3 text-gray-600">
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
      <Link href="/" className="inline-block btn-primary mt-6">
        Checkout
      </Link>
    </aside>
  );
};

export { OrderSummary };
