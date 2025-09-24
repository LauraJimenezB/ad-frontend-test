"use client";

import { useSearchParams, useRouter } from "next/navigation";

type GenreFilterProps = { genres: string[] };

const GenreFilter = ({ genres }: GenreFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let selectedGenre = searchParams.get("genre");

  const isAll = !selectedGenre;

  function applyGenreFilter(genre?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!genre || genre === "All") {
      params.delete("genre");
    } else {
      params.set("genre", genre);
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }
  const handleSelectChange = (genre: string) => {
    applyGenreFilter(genre);
  };

  const handleAllClick = () => {
    applyGenreFilter("All");
  };

  return (
    <div className="inline-flex items-center gap-2">
      <select
        id="genre-select"
        value={selectedGenre ?? ""}
        onChange={(e) => handleSelectChange(e.target.value)}
        className={`pl-0 pr-0 sm:px-3 sm:py-2 rounded-md text-sm hover:bg-primary-light ${
          !isAll ? "text-selected" : "text-unselected"
        }`}
      >
        <>
          <option value="">Genre</option>
          {genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </>
      </select>

      <span className="px-3 py-2 text-sm text-gray-700 font-thin">|</span>

      <button
        className={`px-3 py-2 rounded-md text-sm hover:bg-primary-light ${
          isAll ? "text-selected" : "text-unselected"
        }`}
        onClick={() => handleAllClick()}
      >
        All
      </button>
    </div>
  );
};

export { GenreFilter };
