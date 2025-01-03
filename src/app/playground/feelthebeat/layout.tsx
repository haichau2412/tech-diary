"use client";

import React from "react";
import { Pixelify_Sans } from "next/font/google";

const font = Pixelify_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`${font.className} h-full bg-gray-800 text-lg text-slate-200`}
    >
      <header>
        <h1>Feel The Beat</h1>
      </header>

      <main>{children}</main>
      <footer style={{ marginTop: "20px" }}>
        <p>&copy; 2023 Feel The Beat. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
