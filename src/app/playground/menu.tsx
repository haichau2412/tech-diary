"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";

const PATH_TO_NAME = {
  utubeNote: "Utube Note",
  blog: "Blog",
};

const Menu = () => {
  const pathName = usePathname();

  const currentRef = useRef<HTMLUListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activeLink = pathName.split("/")[2];

  const currentName = PATH_TO_NAME[activeLink as keyof typeof PATH_TO_NAME];

  const toggleMenu = () => {
    if (currentRef.current && svgRef.current) {
      currentRef.current.classList.toggle("show");
      svgRef.current.classList.toggle("show");
    }
  };

  return (
    <div className="my-1 flex items-center justify-center gap-2 bg-green-100 py-[2px] sm:text-lg">
      <nav className="navPlaygroud flex w-min flex-col gap-2">
        <button className="relative" onClick={toggleMenu}>
          <div className="flex items-center justify-between text-nowrap">
            <span className="font-bold">Choose experiment</span>
            <svg
              ref={svgRef}
              className={`fill-green-800 ${currentName ? "active" : ""} ml-1`}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm0-80h560L520-492v-268h-80v268L200-200Zm280-280Z" />
            </svg>
            {currentName && (
              <p className="text-sm font-bold">
                (
                <span className="align-middle text-green-800">
                  {currentName}
                </span>{" "}
                <span className="align-middle"> activated</span>)
              </p>
            )}
          </div>
          <ul
            ref={currentRef}
            className="absolute left-1/2 top-full -translate-x-1/2 list-none text-nowrap text-center text-sm"
          >
            <div className="text-white">
              <li>
                <Link
                  className="block bg-red-800 px-2 py-1 hover:bg-red-700 active:bg-red-700"
                  href="/playground/utubeNote"
                >
                  Utube Note
                </Link>
              </li>
              <li>
                <Link
                  className="block bg-blue-800 px-2 py-1 hover:bg-blue-700 active:bg-blue-700"
                  href="/playground/blog"
                >
                  Blog post
                </Link>
              </li>
            </div>
          </ul>
        </button>
      </nav>
    </div>
  );
};

export default Menu;
