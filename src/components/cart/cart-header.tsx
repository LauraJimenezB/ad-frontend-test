"use client";

import Link from "next/link";

export function CartHeader({ count }: { count: number }) {
  return (
    <section className="py-6 border-none">
      <Link href="/" className="text-sm text-black-600 hover:underline">
        ← Back to Catalog
      </Link>
      <h1 className="text-2xl font-semibold mt-14 mb-2">Your Cart</h1>
      <span className="text-sm text-gray-500">{count} items</span>
    </section>
  );
}
