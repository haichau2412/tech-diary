"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const GsapSwapperNav = () => {
  const [selected, setSelected] = useState<"left" | "right">("left");
  const capsuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capsule = capsuleRef.current;
    if (!capsule) return;

    const x = selected === "left" ? 0 : 128; // adjust this based on button width
    gsap.to(capsule, {
      x,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [selected]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative flex w-64 rounded-full bg-white p-1 shadow-md">
        {/* Capsule */}
        <div
          ref={capsuleRef}
          className="absolute top-1 left-1 z-0 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-blue-500"
        />

        {/* Buttons */}
        <button
          className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === "left" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => setSelected("left")}
        >
          Option 1
        </button>
        <button
          className={`relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === "right" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => setSelected("right")}
        >
          Option 2
        </button>
      </div>
    </div>
  );
};

export default GsapSwapperNav;
