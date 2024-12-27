"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./authContext";

import Link from "next/link";

export default function Nav() {
  const data = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="mx-2 my-1 flex items-center justify-center gap-2 border-b border-t border-solid border-black py-[2px] sm:text-lg">
      {/* <Link
        className={`px-4 decoration-yellow-600 ${pathname === "/playground/aboutme" ? "activeLink" : ""}`}
        href="/playground/aboutme"
      >
        Chau, who?
      </Link> */}
      <Link
        className={`px-4 decoration-red-900 ${pathname === "/playground/utubeNote" ? "activeLink" : ""}`}
        href="/playground/utubeNote"
      >
        {`Utube Note ${data.isAuthorized ? "" : "(Guest)"}`}
      </Link>
      {/* <Link
        className={`px-4 decoration-blue-900 ${pathname === "playground/blog" ? "activeLink" : ""}`}
        href="/playground/blog"
      >
        Blogs
      </Link> */}
    </div>
  );
}
