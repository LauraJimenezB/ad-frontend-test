import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col items-center border-b bg-primary-light">
      <div className="flex w-full max-w-7xl pl-6 pr-4 sm:px-10 md:px-20 py-3 justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="text-lg font-semibold text-secondary-dark">
            GamerShop
          </span>
        </Link>

        <Link
          href="/cart"
          className="relative inline-flex items-center rounded-xl px-3 py-2 hover:bg-gray-100 text-secondary-dark"
          aria-label="Go to cart"
        >
          <Image src="/cart-icon.svg" alt="cart-icon" width={22} height={22} />
        </Link>
      </div>
    </header>
  );
}
