import SlideNav from "@/app/blog/slideNav";

const DUMMY_DATA = [
  {
    id: "brainstorming",
    title: "Portfolio brainstorming",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "history",
    title: "History change",
  },
];

export default function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <SlideNav items={DUMMY_DATA} />
      {children}
    </div>
  );
}
