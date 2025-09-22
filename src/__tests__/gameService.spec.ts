import { getGames, getGenres } from "@/services/gameService";
import { Game } from "@/types/game";

describe("gameService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches games without genre filter", async () => {
    const mockGames: Game[] = [
      {
        id: "1",
        name: "Fortnite",
        description: "BR game",
        price: 0,
        genre: "Battle Royale",
        image: "/fortnite.jpg",
        isNew: true,
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGames,
    }) as any;

    const result = await getGames(undefined, 1);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/games?page=1"),
      expect.any(Object),
    );
    expect(result).toEqual(mockGames);
  });

  it("fetches games with genre filter", async () => {
    const mockGames: Game[] = [
      {
        id: "2",
        name: "Apex Legends",
        description: "Shooter",
        price: 0,
        genre: "Shooter",
        image: "/apex.jpg",
        isNew: false,
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGames,
    }) as any;

    const result = await getGames("Shooter", 2);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("genre=Shooter"),
      expect.any(Object),
    );
    expect(result[0].name).toBe("Apex Legends");
  });

  it("derives unique genres from games", async () => {
    const mockGames: Game[] = [
      {
        id: "1",
        name: "Fortnite",
        description: "BR",
        price: 0,
        genre: "Battle Royale",
        image: "/fortnite.jpg",
        isNew: false,
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
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGames,
    }) as any;

    const genres = await getGenres();

    expect(genres).toEqual(["Battle Royale", "Shooter"]);
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
