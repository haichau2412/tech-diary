"use client";
import { useRef } from "react";

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
    <div className="relative">
      <div
        ref={currentRef}
        className="flex snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((i) => {
          return (
            <div
              key={i.id}
              className="grid aspect-[3/2] w-[150px] flex-shrink-0 snap-start place-content-center truncate text-wrap rounded-md bg-red-300"
            >
              {i.title}
            </div>
          );
        })}
      </div>
      <div
        className="absolute top-full flex h-6 w-6 items-center justify-center rounded-full bg-pink-200"
        onClick={() => {
          if (currentRef.current) {
            currentRef.current.scrollLeft -= 400;
          }
        }}
      >{`<`}</div>
      <div
        onClick={() => {
          if (currentRef.current) {
            currentRef.current.scrollLeft += 400;
          }
        }}
        className="absolute right-0 top-full flex h-6 w-6 items-center justify-center rounded-full bg-pink-200"
      >{`>`}</div>
    </div>
  );
};

export default SlideNav;
