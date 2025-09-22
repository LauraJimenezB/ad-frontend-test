import { Game } from "@/types/game";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGames(
  genre?: string,
  page: number = 1,
): Promise<Game[]> {
  try {
    const url = new URL(`${API_URL}/games`);
    url.searchParams.append("page", page.toString());
    if (genre && genre !== "All") {
      url.searchParams.append("genre", genre);
    }

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch games");

    return res.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

// To get all genres in the movie list
export async function getGenres(): Promise<string[]> {
  const games = await getGames(undefined, 1);
  const set = new Set<string>();
  for (const g of games) set.add(g.genre);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
