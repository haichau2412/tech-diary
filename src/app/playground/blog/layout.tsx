import SlideNav from "@/app/playground/blog/slideNav";
import { posts } from "./[id]/page";
import "./blog.css";

export default function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <SlideNav items={posts} />
      {children}
    </div>
  );
}
