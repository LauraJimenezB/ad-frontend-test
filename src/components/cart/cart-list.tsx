import { Game } from "@/types/game";
import { CartItem } from "./cart-item";

const CartList = ({ items }: { items: Game[] }) => {
  return (
    <div className="divide-y">
      {items.map((game) => (
        <CartItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export { CartList };
