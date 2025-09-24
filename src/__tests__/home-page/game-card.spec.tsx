import { render, screen, fireEvent } from "@testing-library/react";
import { useCart } from "@/context/cart-context";
import { GameCard } from "@/components/home/game-card";
import { Game } from "@/types/game";

jest.mock("@/context/cart-context", () => ({
  useCart: jest.fn(),
}));

const mockGame: Game = {
  id: "1",
  genre: "Action",
  name: "Cyberpunk 2077",
  description: "Open world RPG",
  price: 59.99,
  image: "/game-images/cyberpunk2077.jpeg",
  isNew: false,
};

const mockNewGame: Game = {
  id: "1",
  genre: "Action",
  name: "Cyberpunk 2077",
  description: "Open world RPG",
  price: 59.99,
  image: "/game-images/cyberpunk2077.jpeg",
  isNew: true,
};

describe("GameCard", () => {
  it("renders game details", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: () => false,
      addToCart: jest.fn(),
      removeItem: jest.fn(),
    });

    render(<GameCard game={mockGame} />);

    expect(screen.getByText(/action/i)).toBeInTheDocument();
    expect(screen.getByText(/cyberpunk 2077/i)).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();

    // isNew: false, badge New is not shown
    expect(screen.queryByText(/new/i)).not.toBeInTheDocument();

    expect(screen.getByText("ADD TO CART")).toBeInTheDocument();
  });

  it("renders NEW badge when item has isNew attribute", () => {
    (useCart as jest.Mock).mockReturnValue({
      isInCart: () => false,
      addToCart: jest.fn(),
      removeItem: jest.fn(),
    });

    render(<GameCard game={mockNewGame} />);

    expect(screen.getByText(/action/i)).toBeInTheDocument();
    expect(screen.getByText(/cyberpunk 2077/i)).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByText(/new/i)).toBeInTheDocument();
  });

  it("calls addToCart when clicking ADD TO CART", () => {
    const addToCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isInCart: () => false,
      addToCart,
      removeItem: jest.fn(),
    });

    render(<GameCard game={mockGame} />);
    fireEvent.click(
      screen.getByRole("button", { name: `Add ${mockGame.name} to cart` })
    );

    expect(addToCart).toHaveBeenCalledWith(mockGame);
  });

  it("calls removeItem when clicking REMOVE", () => {
    const removeItem = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isInCart: () => true,
      addToCart: jest.fn(),
      removeItem,
    });

    render(<GameCard game={mockGame} />);
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));

    expect(removeItem).toHaveBeenCalledWith(mockGame.id);
  });
});
