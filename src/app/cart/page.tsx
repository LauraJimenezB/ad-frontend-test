import { CartHeader } from "@/components/cart/cart-header";
import { CartList } from "@/components/cart/cart-list";
import { OrderSummary } from "@/components/cart/order-summary";

export default async function Cart() {
  return (
    <main className="flex flex-col items-center justify-between text-md">
      <CartHeader />
      <section className="grid grid-cols-10 gap-12 w-full border-none">
        <div className="col-span-6">
          <CartList />
        </div>
        <div className="col-span-4">
          <OrderSummary />
        </div>
      </section>
    </main>
  );
}
