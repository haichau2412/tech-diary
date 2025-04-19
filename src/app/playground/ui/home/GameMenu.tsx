"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Card = () => {
  return (
    <div className="bg-green-800text-white popup mx-2 flex h-[200px] w-[300px] items-center justify-center rounded-md"></div>
  );
};

const GameMenu = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <ul className="flex">
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </ul>
    </div>
  );
};

export default GameMenu;
