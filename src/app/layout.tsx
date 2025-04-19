import type { Metadata } from "next";
import "@/app/globals.css";
import { PT_Sans_Narrow, Rye } from "next/font/google";
import Header from "./ui/header/Header";
import { TransitionProvider } from "./shared/transition/transitionContext";
import OverlayLoader from "./shared/transition/TransitionOverplay";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = PT_Sans_Narrow({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const rye = Rye({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech diary",
  description: "Chau's portfolio",
};

export function generateViewport() {
  return {
    viewport: "width=device-width, initial-scale=1.0",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} ${rye.variable} flex max-h-screen min-h-screen flex-col`}
      >
        <TransitionProvider>
          <Header />
          <OverlayLoader />
          {children}
          <SpeedInsights />
        </TransitionProvider>
      </body>
    </html>
  );
}
