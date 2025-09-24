"use client";

import Image from "next/image";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="card flex flex-col">
      <div className="card-img aspect-[16/11] relative">
        <Image
          src={game.image}
          alt={game.name}
          width={400}
          height={600}
          className="h-full w-full object-cover"
        />
        {game.isNew && (
          <span className="badge-new absolute left-2 top-2">New</span>
        )}
      </div>

      <div className="flex flex-1 flex-col mt-3">
        <h3 className="card-title">{game.genre.toLocaleUpperCase()}</h3>

        <div className="mt-auto flex items-baseline items-center justify-between pt-3 pb-3">
          <p className="card-text line-clamp-2">{game.name}</p>
          <span className="card-text ">${game.price.toFixed(2)}</span>
        </div>
        <button className="btn text-xs">ADD TO CART</button>
      </div>
    </article>
  );
};

export { GameCard };
