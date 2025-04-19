import "./playground.css";
import SwapperNav from "./ui/home/SwapperNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SwapperNav />
      {children}
    </>
  );
}
