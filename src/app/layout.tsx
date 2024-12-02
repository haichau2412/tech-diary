import type { Metadata } from "next";
import "@/app/globals.css";
import Nav from "@/components/nav.tsx";
import Header from "@/components/header.tsx";

import { Tinos } from "next/font/google";

export const metadata: Metadata = {
  title: "Chau Portfolio",
};

export function generateViewport() {
  return {
    viewport: "width=device-width, initial-scale=1.0",
  };
}

const tinos = Tinos({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tinos.className}`}>
        <div className="flex h-screen w-screen cursor-default flex-col px-5 py-3">
          <Header />
          <Nav />
          {/* <WantedBanner /> */}
          <div className="flex max-w-full flex-grow flex-col items-center justify-center overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
