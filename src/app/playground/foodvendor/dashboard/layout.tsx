import Sidebar from "./ui/Sidebar";
import "./global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-amber-100">
      <Sidebar />
      {children}
    </div>
  );
}
