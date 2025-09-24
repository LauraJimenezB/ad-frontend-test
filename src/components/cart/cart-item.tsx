"use client";

import Image from "next/image";
import type { Game } from "@/types/game";

const CartItem = ({
  game,
  handleRemove,
}: {
  game: Game;
  handleRemove: (id: string) => void;
}) => {
  return (
    <div className="cart-item w-full flex flex-row">
      <div className="w-full gap-4 py-4 flex flex-col sm:flex-row">
        <div className="cart-item-img">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="fill sm:object-cover"
            sizes="128px"
          />
        </div>
        <div className="cart-item-content">
          <div className="flex flex-col justify-between items-start">
            <h3 className="cart-item-title">
              {game.genre.toLocaleUpperCase()}
            </h3>
            <h3 className="font-semibold mt-3">{game.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {game.description}
            </p>
          </div>
          <div className="flex justify-end mt-10 pr-12">
            <span className="font-medium">${game.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-start justify-start pt-3">
        <button
          className="text-sm w-5 h-5 rounded-full text-secondary-light hover:bg-primary-light"
          onClick={() => handleRemove(game.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export { CartItem };
