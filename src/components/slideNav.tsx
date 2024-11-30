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
              className="aspect-[3/2] w-[150px] flex-shrink-0 truncate bg-red-300 snap-start"
            >
              {i.title}
            </div>
          );
        })}

        <div
          className="absolute top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white"
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
          className="absolute right-0 top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white"
        >{`>`}</div>
      </div>
    </div>
  );
};

export default SlideNav;
