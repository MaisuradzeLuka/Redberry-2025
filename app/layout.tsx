import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/shared/Navbar";

// const firaGo = localFont({
//   src: [
//     {
//       path: "/public/fonts/girago-regular.otf",
//       weight: "400",
//       style: "regular",
//     },
//     // {
//     //   path: "./fonts/FiraGo-ExtraLight.ttf",
//     //   weight: "350",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "./fonts/FiraGo-Regular.ttf",
//     //   weight: "400",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "./fonts/FiraGo-Medium.ttf",
//     //   weight: "500",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "./fonts/FiraGo-SemiBold.ttf",
//     //   weight: "600",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "./fonts/FiraGo-Bold.ttf",
//     //   weight: "700",
//     //   style: "normal",
//     // },
//     // {
//     //   path: "./fonts/FiraGo-Black.ttf",
//     //   weight: "900",
//     //   style: "normal",
//     // },
//   ],
// });

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
