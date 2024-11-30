"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="col-span-2 mx-2 my-1 flex items-center justify-center gap-2 border-b border-t border-solid border-black py-[2px]">
      <Link
        className={`px-4 ${
          ["/experiment", "/"].includes(pathname) ? "activeLink" : ""
        }`}
        href="/experiment"
      >
        Experiment UI
      </Link>
      <Link
        className={`px-4 ${pathname === "/blog" ? "activeLink" : ""}`}
        href="/blog"
      >
        Blogs
      </Link>
    </div>
  );
}
