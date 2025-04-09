import Menu from "./menu";
import AuthProvider from "libs/auth/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <main className="flex grow cursor-default flex-col">
        <Menu />
        <div className="flex-shrink overflow-hidden">{children}</div>
      </main>
    </AuthProvider>
  );
}
