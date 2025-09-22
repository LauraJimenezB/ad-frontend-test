import { Game, GamesResponse } from "@/types/game";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGames(
  genre?: string,
  page: number = 1
): Promise<GamesResponse> {
  try {
    const url = new URL(`${API_URL}/games`);
    url.searchParams.set("page", String(page));
    if (genre && genre !== "All") url.searchParams.set("genre", genre);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch games");

    return res.json() as Promise<GamesResponse>;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}
