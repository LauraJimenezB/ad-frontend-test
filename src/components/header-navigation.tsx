import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="text-lg font-semibold">GamerShop</span>
          <Image
            src="/apply-digital-logo.svg"
            alt="Apply Digital"
            width={120}
            height={28}
            priority
          />
        </Link>

        <Link
          href="/cart"
          className="relative inline-flex items-center rounded-md px-3 py-2 hover:bg-gray-100"
          aria-label="Go to cart"
        >
          <Image src="/cart-icon.svg" alt="cart-icon" width={22} height={22} />
        </Link>
      </div>
    </header>
  );
}
