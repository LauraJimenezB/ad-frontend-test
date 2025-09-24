import Footer from "@/components/footer";
import HeaderNavigation from "@/components/header-navigation";
import { CartProvider } from "@/context/cart-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-dvh flex flex-col bg-white`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <HeaderNavigation />
            <main className="flex-grow pb-3">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
