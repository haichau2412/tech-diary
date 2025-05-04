export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="customScrollBar flex grow flex-col overflow-x-hidden overflow-y-auto">
      {children}
    </div>
  );
}
