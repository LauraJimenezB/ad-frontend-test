import { FilterSection } from "@/components/filter-section";
import { GameCatalog } from "@/components/game-catalog";
import { getGames } from "@/services/gameService";

type Search = { genre?: string; page?: string };

export default async function Home({ searchParams }: { searchParams: Search }) {
  const genre = searchParams.genre;
  const page = Number(searchParams.page) || 1;

  const gamesResponse = await getGames(genre, page);

  return (
    <main className="flex flex-col items-center justify-between text-md">
      <FilterSection genres={gamesResponse.availableFilters} />
      <GameCatalog games={gamesResponse.games} />
    </main>
  );
}
