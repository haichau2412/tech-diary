"use client";

import { useRef } from "react";
import Link from "next/link";

const SlideNav = ({
  items,
}: {
  items: {
    id: string;
    title: string;
  }[];
}) => {
  const currentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="stickyNav order-1 h-full flex-shrink-0 basis-[100px] overflow-hidden border-black bg-blue-50 pr-1 sm:order-none sm:basis-auto sm:border-r-2">
      <div
        ref={currentRef}
        className="customScrollBar seperator blue flex snap-both snap-mandatory gap-2 overflow-scroll scroll-smooth pr-3 sm:max-h-full sm:flex-col"
      >
        {items.map((i) => {
          return (
            <Link key={i.id} href={`/playground/blog/${i.id}`}>
              <div
                key={i.id}
                className="grid aspect-[3/2] w-[140px] flex-shrink-0 snap-start place-content-center truncate text-center text-wrap text-blue-950 sm:w-[150px]"
              >
                {i.title}
              </div>
            </Link>
          );
        })}
      </div>
      <>
        <div
          className="navBtn blue absolute left-0 sm:left-[220px] sm:hidden"
          onClick={() => {
            if (currentRef.current) {
              currentRef.current.scrollLeft -= 400;
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div
          onClick={() => {
            if (currentRef.current) {
              currentRef.current.scrollLeft += 400;
            }
          }}
          className="navBtn blue absolute right-0 sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </>
    </div>
  );
};

export default SlideNav;
