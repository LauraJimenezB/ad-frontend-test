import { CartHeader } from "@/components/cart/cart-header";
import { CartList } from "@/components/cart/cart-list";
import { OrderSummary } from "@/components/cart/order-summary";
import { getGames } from "@/services/gameService";

export default async function Cart() {
  // Temporarily calling all games
  const gamesResponse = await getGames();

  const summary = [gamesResponse.games[0], gamesResponse.games[1]];

  return (
    <main className="flex flex-col items-center justify-between text-md">
      <CartHeader count={1} />
      <section className="grid grid-cols-10 gap-12 w-full">
        <div className="col-span-6">
          <CartList items={gamesResponse.games} />
        </div>
        <div className="col-span-4">
          <OrderSummary count={1} items={summary} />
        </div>
      </section>
    </main>
  );
}
