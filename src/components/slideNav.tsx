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
    <div className="relative h-full w-max flex-shrink-0 overflow-hidden border-r-2 border-black pr-1">
      <div
        ref={currentRef}
        className="customScrollBarUtube flex max-h-full w-full snap-both snap-mandatory flex-col gap-2 overflow-y-scroll scroll-smooth pr-3"
      >
        {items.map((i) => {
          return (
            <Link key={i.id} href={`/blog/${i.id}`}>
              <div
                key={i.id}
                className="grid aspect-[3/2] w-[150px] flex-shrink-0 snap-start place-content-center truncate text-wrap border-b border-blue-950"
              >
                {i.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SlideNav;
