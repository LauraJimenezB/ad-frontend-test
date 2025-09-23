import { GenreFilter } from "./genre-filter";

type FilterSectionProps = { genres: string[] };

const FilterSection = ({ genres }: FilterSectionProps) => {
  return (
    <section>
      <h2 className="text-md font-semibold">Top Sellers</h2>
      <div className="w-full flex justify-end">
        <GenreFilter genres={genres} />
      </div>
    </section>
  );
};

export { FilterSection };
