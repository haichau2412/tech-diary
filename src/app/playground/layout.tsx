import Menu from "./menu";
import AuthProvider from "libs/auth/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen max-h-screen w-screen cursor-default flex-col sm:px-5">
        <Menu />
        <div className="flex-shrink overflow-hidden">{children}</div>
      </div>
    </AuthProvider>
  );
}
