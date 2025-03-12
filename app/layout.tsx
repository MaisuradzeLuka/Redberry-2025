import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Momentum",
  description: "Monitor and track your growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased ">
        <Navbar />
        <main className="max-w-[1920px] mx-auto px-[120px] py-8 ">
          {children}
        </main>
      </body>
    </html>
  );
}
