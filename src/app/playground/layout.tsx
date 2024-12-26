import Nav from "@/components/nav.tsx";
import AuthProvider from "@/components/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen max-h-screen w-screen cursor-default flex-col sm:px-5">
        <AuthProvider>
          <Nav />
          <div className="flex-shrink flex-grow overflow-hidden">
            {children}
          </div>
        </AuthProvider>
      </div>
    </>
  );
}
