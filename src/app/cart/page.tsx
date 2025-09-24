import { CartHeader } from "@/components/cart/cart-header";

export default async function Cart() {
  return (
    <main className="flex flex-col items-center justify-between text-md">
      <CartHeader count={1} />
    </main>
  );
}
