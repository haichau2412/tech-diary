import type { Metadata } from "next";
import "@/app/globals.css";
import NewHeader from "@/components/newHeader";
import { PT_Sans_Narrow } from "next/font/google";

const font = PT_Sans_Narrow({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${font.className}`}>
        <div className="flex h-screen max-h-screen w-screen cursor-default flex-col">
          <NewHeader />
          <main className="flex-shrink flex-grow overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
