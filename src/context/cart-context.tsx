"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Game } from "@/types/game";

type CartContextType = {
  items: Game[];
  addToCart: (game: Game) => void;
  removeItem: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
  itemsCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Game[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }
  }, [items]);

  const addToCart = (game: Game) => {
    setItems((prev) =>
      prev.some((g) => g.id === game.id) ? prev : [...prev, game]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((g) => g.id !== id));
  };

  const isInCart = (id: string) => items.some((g) => g.id === id);

  const clearCart = () => setItems([]);

  const itemsCount = items?.length;

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeItem, isInCart, clearCart, itemsCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
