import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const initialItems = [
  { id: 1, color: "#FF6B6B" },
  { id: 2, color: "#6BCB77" },
  { id: 3, color: "#4D96FF" },
  { id: 4, color: "#FFD93D" },
  { id: 5, color: "#A66DD4" },
  { id: 6, color: "#F18F01" },
  { id: 7, color: "#2EC4B6" },
];

const VISIBLE_COUNT = 5;

export const Card = () => {
  return (
    <div className="bg-green-800text-white popup mx-2 flex h-[200px] w-[300px] items-center justify-center rounded-md"></div>
  );
};

const AutoCarousel = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef([...initialItems]);

  useGSAP(
    () => {
      const getOrCreateTimeline = (target) => {
        if (!timelines.has(target)) {
          const tl = gsap.timeline({ paused: true });
          tl.to(target, {
            scaleX: 1.1,
            scaleY: 0.8,
            duration: 0.15,
            ease: "power1.inOut",
          });
          timelines.set(target, tl);
        }
        return timelines.get(target);
      };

      const handleMouseDown = (e) => {
        const target = e.target;
        if (target.classList.contains("popup")) {
          const tl = getOrCreateTimeline(target);
          tl.play();
          target.addEventListener("mouseleave", handleMouseLeave);
        }
      };

      const handleMouseUp = (e) => {
        const target = e.target;
        if (target.classList.contains("popup")) {
          const tl = getOrCreateTimeline(target);
          tl.reverse();
        }
      };

      const handleMouseLeave = (e) => {
        const target = e.target;
        if (target.classList.contains("popup")) {
          const tl = getOrCreateTimeline(target);
          tl.reverse();
          target.removeEventListener("mouseleave", handleMouseLeave);
        }
      };

      const addItems = () => {
        const ul = ulRef.current;
        if (!ul) return;

        const RADIUS = 2000;
        const CENTER_Y = 200;

        const ANGLE_STEP = 10; // degrees between cards

        const lis1 = ul.querySelectorAll("li");

        const aa = Math.round(VISIBLE_COUNT / 2);

        if (lis1.length === 0) {
          itemsRef.current.forEach((item, index) => {
            if (index < VISIBLE_COUNT) {
              const angleDeg = (index - aa + 1) * ANGLE_STEP;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = RADIUS * Math.sin(angleRad);
              const y = CENTER_Y - RADIUS * Math.cos(angleRad) + 1750;
              const rotateAngle = angleDeg;
              const li = document.createElement("li");
              li.className = `popup w-[300px] h-[200px] flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-500 opacity-100 absolute`;
              li.style.backgroundColor = item.color;
              li.style.transform = `translate(${x}px, ${y}px) rotate(${rotateAngle}deg)`;
              li.textContent = `Game ${item.id}`;
              ul.appendChild(li);
            }
          });
        }

        const item = itemsRef.current[itemsRef.current.length - 1];
        const angleDeg = (VISIBLE_COUNT + 1 - aa) * ANGLE_STEP;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = RADIUS * Math.sin(angleRad);
        const y = CENTER_Y - RADIUS * Math.cos(angleRad) + 1750;
        const rotateAngle = angleDeg;

        const li = document.createElement("li");
        li.className = `popup w-[300px] h-[200px] flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-500 opacity-0 absolute`;
        li.style.backgroundColor = item.color;
        li.style.transform = `translate(${x}px, ${y}px) rotate(${rotateAngle}deg)`;
        li.textContent = `Game ${item.id}`;
        ul.appendChild(li);

        gsap.to(li, {
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        });

        const lis = ul.querySelectorAll("li");

        lis.forEach((li, idx) => {
          const angleDeg = (idx - aa) * ANGLE_STEP;
          const angleRad = (angleDeg * Math.PI) / 180;

          const x = RADIUS * Math.sin(angleRad);
          const y = CENTER_Y - RADIUS * Math.cos(angleRad) + 1750;
          const rotateAngle = angleDeg;

          if (lis.length === VISIBLE_COUNT + 1 && idx === 0) {
            const tl = gsap.timeline();
            tl.to(
              li,
              {
                opacity: 0,
                duration: 1,
                ease: "power1.out",
              },
              0,
            )

              .to(
                li,
                {
                  x: x,
                  y: y,
                  rotation: rotateAngle,
                  duration: 2,
                  ease: "power1.inOut",
                },
                0,
              )

              .to(
                {},
                {
                  duration: 0.1, // wait just a bit to ensure last frame renders
                  onComplete: () => {
                    li?.parentNode?.removeChild(li);
                    addItems();
                  },
                },
              );
          } else {
            gsap.to(li, {
              ease: "power1.inOut",
              duration: 2,
              x: x,
              y: y,
              rotation: rotateAngle,
            });
          }
        });

        const first = itemsRef.current.shift();

        if (first) {
          itemsRef.current.push(first);
        }
      };

      addItems();

      const timelines = new WeakMap();

      const container = ulRef.current;
      container?.addEventListener("pointerdown", handleMouseDown);
      container?.addEventListener("pointerup", handleMouseUp);

      return () => {
        container?.removeEventListener("pointerdown", handleMouseDown);
        container?.removeEventListener("pointerup", handleMouseUp);
      };
    },
    { scope: ulRef },
  );

  return (
    <div className="mx-auto mt-[100px] h-[300px] w-full">
      <ul
        ref={ulRef}
        className="relative -left-[150px] mx-auto h-[200px] w-1 list-none p-0"
      />
    </div>
  );
};

export default AutoCarousel;
