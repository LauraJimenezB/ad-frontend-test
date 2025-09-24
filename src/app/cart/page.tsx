import { CartHeader } from "@/components/cart/cart-header";
import { CartList } from "@/components/cart/cart-list";
import { getGames } from "@/services/gameService";

export default async function Cart() {
  // Temporarily calling all games
  const gamesResponse = await getGames();

  return (
    <main className="flex flex-col items-center justify-between text-md">
      <CartHeader count={1} />
      <section>
        <CartList items={gamesResponse.games} />
      </section>
    </main>
  );
}
