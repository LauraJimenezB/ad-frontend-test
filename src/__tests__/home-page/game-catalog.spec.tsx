import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { getGames } from "@/services/gameService";
import { useSearchParams } from "next/navigation";
import { GameCatalog } from "@/components/home/game-catalog";
import { CartProvider } from "@/context/cart-context";

jest.mock("@/services/gameService", () => ({
  getGames: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

const mockGamesPage1 = {
  games: Array.from({ length: 12 }).map((_, i) => ({
    id: `${i + 1}`,
    genre: "RPG",
    name: `Game ${i + 1}`,
    description: "Open world RPG",
    price: 59.99,
    image: "/game-images/test.jpeg",
    isNew: true,
  })),
  totalPages: 2,
  currentPage: 1,
};

const mockGamesPage2 = {
  games: [
    {
      id: "13",
      genre: "RPG",
      name: "Game 13",
      description: "Test game",
      price: 20,
      image: "/test.jpeg",
      isNew: true,
    },
  ],
  totalPages: 2,
  currentPage: 2,
};

describe("GameCatalog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("shows loading spinner on initial render", () => {
    (getGames as jest.Mock).mockResolvedValueOnce(mockGamesPage1);

    render(
      <CartProvider>
        <GameCatalog games={[]} />
      </CartProvider>
    );

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("renders games after initial loading", async () => {
    (getGames as jest.Mock).mockResolvedValueOnce(mockGamesPage1);

    render(
      <CartProvider>
        <GameCatalog games={[]} />
      </CartProvider>
    );

    expect(await screen.findByText("Game 1")).toBeInTheDocument();
    expect(screen.getAllByText(/game/i)).toHaveLength(12);
  });

  it("shows 'See More' button when more pages are available", async () => {
    (getGames as jest.Mock).mockResolvedValueOnce(mockGamesPage1);

    render(
      <CartProvider>
        <GameCatalog games={[]} />
      </CartProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/see more/i)).toBeInTheDocument()
    );
  });

  it("loads more games when 'See More' is clicked", async () => {
    (getGames as jest.Mock)
      .mockResolvedValueOnce(mockGamesPage1) // first load
      .mockResolvedValueOnce(mockGamesPage2); // after See More

    render(
      <CartProvider>
        <GameCatalog games={[]} />
      </CartProvider>
    );

    expect(await screen.findByText("Game 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/see more/i));

    expect(await screen.findByText(/game 13/i)).toBeInTheDocument();
  });

  it("hides 'See More' when there are no more pages", async () => {
    (getGames as jest.Mock).mockResolvedValueOnce({
      ...mockGamesPage1,
      totalPages: 1,
    });

    render(
      <CartProvider>
        <GameCatalog games={[]} />
      </CartProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/see more/i)).not.toBeInTheDocument()
    );
  });
});
