import { render, screen, fireEvent } from "@testing-library/react";
import { useCart } from "@/context/cart-context";
import { OrderSummary } from "@/components/cart/order-summary";

jest.mock("@/context/cart-context", () => ({
  useCart: jest.fn(),
}));

describe("OrderSummary", () => {
  it("renders correct item count and list of items", () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [
        { id: "1", name: "Cyberpunk 2077", price: 59.99 },
        { id: "2", name: "The Witcher 3", price: 39.99 },
      ],
      itemsCount: 2,
      clearCart: jest.fn(),
    });

    render(<OrderSummary />);

    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();

    expect(screen.getByText(/cyberpunk 2077/i)).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByText(/the witcher 3/i)).toBeInTheDocument();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  it("renders correct total price", () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [
        { id: "1", name: "Cyberpunk 2077", price: 59.99 },
        { id: "2", name: "The Witcher 3", price: 39.99 },
      ],
      itemsCount: 2,
      clearCart: jest.fn(),
    });

    render(<OrderSummary />);

    expect(screen.getByText(/order total/i)).toBeInTheDocument();
    expect(screen.getByText("$99.98")).toBeInTheDocument();
  });

  it("calls clearCart when checkout button is clicked", () => {
    const clearCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [{ id: "1", name: "Cyberpunk 2077", price: 59.99 }],
      itemsCount: 1,
      clearCart,
    });

    render(<OrderSummary />);

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    expect(clearCart).toHaveBeenCalled();
  });
});
