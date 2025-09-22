export interface Game {
  id: string;
  name: string;
  description: string;
  price: number;
  genre: string;
  image: string;
  isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
  currentPage: number;
  totalPages: number;
  availableFilters: string[];
}
