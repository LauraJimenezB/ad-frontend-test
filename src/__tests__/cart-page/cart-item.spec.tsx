import { render, screen, fireEvent } from "@testing-library/react";
import type { Game } from "@/types/game";
import { CartItem } from "@/components/cart/cart-item";

const mockGame: Game = {
  id: "1",
  genre: "Action",
  name: "Cyberpunk 2077",
  description: "Open world RPG",
  price: 59.99,
  image: "/game-images/cyberpunk2077.jpeg",
  isNew: true,
};

describe("CartItem", () => {
  it("renders game details", () => {
    render(<CartItem game={mockGame} handleRemove={jest.fn()} />);

    expect(screen.getByText(/action/i)).toBeInTheDocument();
    expect(screen.getByText(/cyberpunk 2077/i)).toBeInTheDocument();
    expect(screen.getByText(/open world rpg/i)).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  it("calls handleRemove when x clicked", () => {
    const handleRemove = jest.fn();
    render(<CartItem game={mockGame} handleRemove={handleRemove} />);

    fireEvent.click(screen.getByRole("button", { name: /✕/i }));
    expect(handleRemove).toHaveBeenCalledWith("1");
  });
});
