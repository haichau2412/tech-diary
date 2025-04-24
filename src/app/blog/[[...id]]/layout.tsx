import HomeFooter from "@/app/ui/footer";

export default function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="customScrollBar blogScrollBar relative flex grow flex-col overflow-x-hidden overflow-y-auto">
      <main className="flex grow flex-col bg-neutral-950 px-5 py-10 text-stone-200">
        {children}
      </main>
      <HomeFooter />
    </div>
  );
}
