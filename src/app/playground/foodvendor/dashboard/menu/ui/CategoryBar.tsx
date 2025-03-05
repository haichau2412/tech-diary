"use client";

import { useRef } from "react";
import React from "react";

interface CategoryBarProps {
  items: {
    id: string;
    content: {
      en: string;
      vn: string;
    };
  }[];
  onItemClick: (id: string) => void;
}

const CategoryBar = ({ onItemClick, items }: CategoryBarProps) => {
  const currentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="categoryBar">
      <div ref={currentRef}>
        {items.map(({ id, content }) => {
          return (
            <button
              onClick={() => {
                onItemClick(id);
              }}
              key={id}
            >
              {content.en}
            </button>
          );
        })}
      </div>

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
    </div>
  );
};

export default CategoryBar;
