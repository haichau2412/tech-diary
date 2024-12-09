"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="mx-2 my-1 flex items-center justify-center gap-2 border-b border-t border-solid border-black py-[2px] sm:text-lg">
      <Link
        className={`brown px-4 ${pathname === "/cockpit" ? "activeLink" : ""}`}
        href="/cockpit"
      >
        Cockpit
      </Link>
      <Link
        className={`red px-4 ${pathname === "/blog" ? "activeLink" : ""}`}
        href="/blog"
      >
        My notes
      </Link>
      <Link
        className={`green px-4 ${pathname === "/aboutme" ? "activeLink" : ""}`}
        href="/aboutme"
      >
        Chau, who?
      </Link>
    </div>
  );
}
