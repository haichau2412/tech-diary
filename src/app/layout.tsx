import type { Metadata } from "next";
import "@/app/globals.css";
import Nav from "@/components/nav.tsx";
import Header from "@/components/header.tsx";
import AuthProvider from "@/components/authContext";

import { Tinos } from "next/font/google";

export const metadata: Metadata = {
  title: "Chau tech diary",
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
        <div className="flex h-screen w-screen cursor-default flex-col sm:px-5 sm:py-3">
          <AuthProvider>
            <Header />
            <Nav />
            <div className="h-min max-w-full flex-grow overflow-x-hidden">
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
