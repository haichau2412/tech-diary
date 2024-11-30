import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/nav.tsx";
import TimeInfo from "../components/timeInfo.tsx";
import WantedBanner from "../components/wantedBanner.tsx";

typeof window !== "undefined";

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
        <div className="grid-cols-mainSm grid h-screen w-screen cursor-default grid-rows-main pb-1 lg:grid-cols-main">
          <div className="col-span-2 flex items-center justify-between px-3 py-2">
            <TimeInfo />
            <h1 className="text-4xl font-bold uppercase">Chau's news</h1>
            <div className="flex-grow basis-0 text-right">Weather</div>
          </div>
          <Nav />
          <WantedBanner />
          <div className="max-w-full overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
