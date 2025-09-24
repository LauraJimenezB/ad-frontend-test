"use client";

import { getGames } from "@/services/gameService";
import type { Game } from "@/types/game";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GameCard } from "./game-card";

const GameCatalog = ({ games: initialGames = [] }: { games: Game[] }) => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") ?? undefined;

  const [games, setGames] = useState(initialGames);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For same genre, load more page
  const [initialLoading, setInitialLoading] = useState(true); // For initial load and change-of-genre load
  const [totalPages, setTotalPages] = useState(1);

  // Initial load and change of genre
  useEffect(() => {
    async function load() {
      setInitialLoading(true);

      const res = await getGames(genre, 1);

      setGames(res.games);
      setPage(1);
      setTotalPages(res.totalPages);
      setInitialLoading(false);
    }
    load();
  }, [genre]);

  // Load more pages of the same genre
  async function loadMore() {
    if (page >= totalPages) return;
    setLoading(true);

    const res = await getGames(genre, page + 1);

    setGames((prev) => [...prev, ...res.games]);
    setPage(res.currentPage);
    setLoading(false);
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="container-catalog catalog-grid border-none">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      {page < totalPages && games.length >= 12 && (
        <div className="flex justify-start">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-primary px-6 mt-1 hover:bg-gray-400 disabled:opacity-50"
          >
            {loading ? "Loading..." : "SEE MORE"}
          </button>
        </div>
      )}
    </section>
  );
};

export { GameCatalog };
