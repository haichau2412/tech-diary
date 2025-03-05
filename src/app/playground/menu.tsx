"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pixelify_Sans } from "next/font/google";
import useOnClickOutside from "../shared/hooks/use";

const font = Pixelify_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

const PATH_TO_NAME = {
  utubeNote: "Utube Note",
  blog: "Blog",
  feelthebeat: "Feel the beat",
  roadmap: "Chau's tech diary",
  foodvendor: "Food vendor",
};

const Menu = () => {
  const pathName = usePathname();
  const currentRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useOnClickOutside(currentRef, (e) => {
    if (shown && e.target && !btnRef.current?.contains(e.target as Node)) {
      if (currentRef.current) {
        currentRef.current.classList.remove("show");
      }
      if (svgRef.current) {
        svgRef.current.classList.remove("show");
      }
      setShown(false);
    }
  });

  const activeLink = pathName.split("/")[2];

  const currentName = PATH_TO_NAME[activeLink as keyof typeof PATH_TO_NAME];

  const toggleMenu = () => {
    if (currentRef.current && svgRef.current) {
      setShown(true);
      currentRef.current.classList.toggle("show");
      svgRef.current.classList.toggle("show");
    }
  };

  return (
    <div className="relative my-1 flex items-center justify-center gap-2 bg-green-100 py-[2px] sm:text-lg">
      <nav
        id="main-navigation"
        aria-label="main"
        className="navPlaygroud z-50 flex w-min flex-col gap-2"
      >
        <button
          ref={btnRef}
          onClick={toggleMenu}
          aria-controls="main-navigation"
          aria-expanded={!!shown}
        >
          <div className="flex cursor-pointer items-center justify-between text-nowrap">
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
        </button>
        <div
          onClick={toggleMenu}
          ref={currentRef}
          className="navDropDown absolute top-full left-1/2 -translate-x-1/2"
        >
          <ul className="list-none text-center text-sm text-nowrap text-white">
            <li>
              <Link
                className="block bg-red-800 px-2 py-1 hover:bg-red-600 active:bg-red-700"
                href="/playground/utubeNote"
              >
                Utube Note
              </Link>
            </li>
            <li>
              <Link
                className={`block ${font.className} bg-gray-800 px-2 py-1 text-slate-200 hover:bg-gray-600 active:bg-gray-700`}
                href="/playground/feelthebeat"
              >
                Feel the beat
              </Link>
            </li>
            <li>
              <Link
                className="block bg-blue-800 px-2 py-1 hover:bg-blue-600 active:bg-blue-700"
                href="/playground/roadmap"
              >
                Chau&apos;s tech diary
              </Link>
            </li>
            <li>
              <Link
                className="block bg-blue-800 px-2 py-1 hover:bg-blue-600 active:bg-blue-700"
                href="/playground/blog"
              >
                Blog post
              </Link>
            </li>
            <li>
              <Link
                className="block bg-blue-800 px-2 py-1 hover:bg-blue-600 active:bg-blue-700"
                href="/playground/foodvendor"
              >
                Food vendor
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
