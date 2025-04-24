import HomeFooter from "@/app/ui/footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="customScrollBar green relative flex grow flex-col overflow-x-hidden overflow-y-auto">
      <main className="flex grow flex-col bg-neutral-950 px-5 py-10 text-neutral-200">
        <Link
          href="/blog"
          className="flex w-fit items-center gap-1 border-b-2 border-b-transparent text-sm hover:border-b-neutral-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-lg">Back to Blog</span>
        </Link>
        {children}
      </main>
      <HomeFooter />
    </div>
  );
}
