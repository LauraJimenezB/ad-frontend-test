import { getGames } from "@/services/gameService";
import { GamesResponse } from "@/types/game";

const mockFilteredGamesResponse: GamesResponse = {
  games: [
    {
      id: "1",
      name: "Fortnite",
      description: "BR game",
      price: 0,
      genre: "Action",
      image: "/fortnite.jpg",
      isNew: true,
    },
  ],
  currentPage: 1,
  totalPages: 1,
  availableFilters: ["Action", "Shooter"],
};

const mockAllGamesResponse: GamesResponse = {
  games: [
    {
      id: "1",
      name: "Fortnite",
      description: "BR game",
      price: 0,
      genre: "Action",
      image: "/fortnite.jpg",
      isNew: true,
    },
    {
      id: "2",
      name: "Apex",
      description: "Shooter",
      price: 0,
      genre: "Shooter",
      image: "/apex.jpg",
      isNew: true,
    },
    {
      id: "3",
      name: "COD",
      description: "Shooter",
      price: 0,
      genre: "Shooter",
      image: "/cod.jpg",
      isNew: false,
    },
  ],
  currentPage: 1,
  totalPages: 1,
  availableFilters: ["Action", "Shooter"],
};

describe("gameService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches games without genre filter", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAllGamesResponse,
    }) as any;

    const result = await getGames(undefined, 1);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/games?page=1"),
      expect.any(Object)
    );
    expect(result).toEqual(mockAllGamesResponse);
  });

  it("fetches games with genre filter", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockFilteredGamesResponse,
    }) as any;

    const result = await getGames("Action", 2);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("genre=Action"),
      expect.any(Object)
    );
    expect(result.games[0].name).toBe("Fortnite");
  });

  it("fetches available genres", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAllGamesResponse,
    }) as any;

    const response = await getGames();

    const genres = response.availableFilters;

    expect(genres).toEqual(["Action", "Shooter"]);
  });

  it("throws an error if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Internal Server Error",
      json: async () => [],
    }) as any;

    await expect(getGames()).rejects.toThrow("Failed to fetch games");
  });
});
