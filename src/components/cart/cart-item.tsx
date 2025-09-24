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
    <div className="cart-item flex w-full gap-4 border-b py-4">
      <div className="w-40 relative flex-shrink-0 self-stretch">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="cart-item-title">
              {game.genre.toLocaleUpperCase()}
            </h3>
            <h3 className="font-semibold mt-3">{game.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {game.description}
            </p>
          </div>

          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => handleRemove(game.id)}
          >
            ✕
          </button>
        </div>
        <div className=" flex justify-end mt-10 pr-12">
          <span className="font-medium">${game.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
