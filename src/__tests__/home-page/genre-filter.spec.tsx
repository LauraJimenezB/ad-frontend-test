import { GenreFilter } from "@/components/home/genre-filter";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("GenreFilter", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    // no genre selected
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders genres in the select dropdown and 'All' button", () => {
    render(<GenreFilter genres={["Action", "RPG"]} />);

    // Default
    expect(screen.getByRole("option", { name: "Genre" })).toBeInTheDocument();

    // Options
    expect(screen.getByRole("option", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "RPG" })).toBeInTheDocument();

    // 'All' button
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("applies genre filter when a genre is selected", () => {
    render(<GenreFilter genres={["Action", "RPG"]} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "RPG" },
    });

    expect(pushMock).toHaveBeenCalledWith("/?genre=RPG&page=1");
  });

  it("resets genre filter when All button is clicked", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("genre=Action&page=2")
    );

    render(<GenreFilter genres={["Action", "RPG"]} />);

    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(pushMock).toHaveBeenCalledWith("/?page=1");
  });
});
