import { render, screen } from "@testing-library/react";

jest.mock("@/context/cart-context", () => ({
  useCart: jest.fn(),
}));

import { useCart } from "@/context/cart-context";
import { CartHeader } from "@/components/cart/cart-header";

describe("CartHeader", () => {
  it("renders title, back link, and item count", () => {
    (useCart as jest.Mock).mockReturnValue({ itemsCount: 3 });

    render(<CartHeader />);

    expect(
      screen.getByRole("heading", { name: /your cart/i })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /back to catalog/i });
    expect(link).toHaveAttribute("href", "/");

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("renders '0 items' when cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({ itemsCount: 0 });

    render(<CartHeader />);

    expect(screen.getByText("0 items")).toBeInTheDocument();
  });
});
