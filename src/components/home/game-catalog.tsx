"use client";

import type { Game } from "@/types/game";
import { GameCard } from "./game-card";

const GameCatalog = ({ games = [] }: { games: Game[] }) => {
  return (
    <section className="container-catalog catalog-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
};

export { GameCatalog };
