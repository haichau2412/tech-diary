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
    <div className="relative h-full overflow-hidden">
      <div
        ref={currentRef}
        className="flex max-h-full snap-both snap-mandatory flex-col gap-2 overflow-y-scroll scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((i) => {
          return (
            <Link key={i.id} href={`/blog/${i.id}`}>
              <div
                key={i.id}
                className="grid aspect-[3/2] w-[150px] flex-shrink-0 snap-start place-content-center truncate text-wrap bg-red-300"
              >
                {i.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="absolute top-0 flex h-6 w-6 items-center justify-center rounded-full bg-pink-200"
        onClick={() => {
          if (currentRef.current) {
            currentRef.current.scrollTop += 300;
            console.log("click", currentRef.current.scrollTop);
          }
        }}
      >{`<`}</div>
      <div
        onClick={() => {
          if (currentRef.current) {
            currentRef.current.scrollTop = 300;
            console.log("click", currentRef.current.scrollTop);
          }
        }}
        className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-pink-200"
      >{`>`}</div>
    </div>
  );
};

export default SlideNav;
