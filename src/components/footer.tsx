import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4">
        <Link
          href="/"
          className="relative inline-flex items-center rounded-md px-3 py-2 hover:bg-gray-100"
          aria-label="Go to home"
        >
          <Image
            src="/apply-digital-logo.svg"
            alt="Apply Digital"
            width={120}
            height={28}
          />
        </Link>
      </div>
    </footer>
  );
}
