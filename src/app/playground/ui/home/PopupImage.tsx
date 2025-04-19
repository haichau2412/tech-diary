import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const PopUpWithSpark = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const sparksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const sparkContainer = sparksContainerRef.current;

    if (box && sparkContainer) {
      // POP-UP animation
      gsap.fromTo(
        box,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          onStart: () => triggerSparks(sparkContainer),
        },
      );
    }
  }, []);

  const triggerSparks = (container: HTMLDivElement) => {
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement("div");
      spark.classList.add("spark");
      container.appendChild(spark);

      const angle = (Math.PI * 2 * i) / 12;
      const distance = 40 + Math.random() * 30;

      gsap.fromTo(
        spark,
        {
          x: 0,
          y: 0,
          opacity: 1,
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            spark.remove();
          },
        },
      );
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div ref={sparksContainerRef} className="absolute"></div>
      <div
        ref={boxRef}
        className="flex h-40 w-40 items-center justify-center rounded-xl bg-pink-500 text-xl font-bold text-white shadow-lg"
      >
        POP!
      </div>
    </div>
  );
};

export default PopUpWithSpark;
