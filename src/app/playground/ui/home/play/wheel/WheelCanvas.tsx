import React, { useRef, useEffect, useState, useCallback } from "react";
import { useWheel } from "./wheelContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const size = 410;

const COLORS = [
  "#FFC312",
  "#F79F1F",
  "#EE5A24",
  "#EA2027",
  "#009432",
  "#006266",
  "#1B1464",
  "#9980FA",
  "#B53471",
  "#12CBC4",
];

const DUMMYDATA = {
  data: [
    "Prize 1",
    "Prize 2",
    "Prize 3",
    "Prize 4",
    "Prize 5",
    "Prize 6",
    "Prize 7",
    "Prize 8",
    "Prize 9",
    "Try again",
  ],
  wheelColor: COLORS,
};

const getRandomColor = (tailHeadColor?: string[]) => {
  let randomItem = COLORS[Math.floor(Math.random() * COLORS.length)];

  while (tailHeadColor?.includes(randomItem)) {
    randomItem = COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  return randomItem;
};

const WheelCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [refReady, setRefReady] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [angle, setAngle] = useState(0);
  const rimLightRef = useRef<boolean>(false);
  const wheelColorRef = useRef<string[]>([]);

  const { wheelData, wheelState, setWheelState, setSelectedIndex } = useWheel();

  const setRef = (node: HTMLCanvasElement) => {
    if (canvasRef.current) {
      return;
    }

    canvasRef.current = node;

    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = size * dpr;
    canvasRef.current.height = size * dpr;
    canvasRef.current.style.width = `${size}px`;
    canvasRef.current.style.height = `${size}px`;
    const ctx = node.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }
    setRefReady(true);
  };

  const drawWheel = useCallback((wheelData: string[], angleOffset: number) => {
    const ctx = ctxRef.current;
    if (!ctx) {
      return;
    }

    const _data = wheelData.length < 3 ? DUMMYDATA.data : wheelData;
    const _color =
      wheelData.length < 3 ? DUMMYDATA.wheelColor : wheelColorRef.current;

    const innerSize = size - 10;

    const center = size / 2;
    const radius = (innerSize - 20) / 2;
    const innerPadding = 10;
    const sliceAngle = (2 * Math.PI) / _data.length;

    ctx.clearRect(0, 0, size, size);
    ctx.save();

    if (!rimLightRef.current) {
      ctx.shadowColor = "#ffd375";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#7a1010";
    ctx.stroke();

    ctx.restore();

    _data.forEach((s, i) => {
      const startAngle = angleOffset + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      //Section
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius - innerPadding, startAngle, endAngle);
      ctx.fillStyle = _color[i];
      ctx.fill();

      // Draw separator line
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + (radius - innerPadding) * Math.cos(startAngle),
        center + (radius - innerPadding) * Math.sin(startAngle),
      );
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.save();

      // Draw flicker light
      const gradient = ctx.createRadialGradient(
        center + radius * Math.cos(startAngle),
        center + radius * Math.sin(startAngle),
        3,
        center + radius * Math.cos(startAngle),
        center + radius * Math.sin(startAngle),
        5,
      );

      gradient.addColorStop(0, rimLightRef.current ? "#fc0a0a" : "#ffd375");
      gradient.addColorStop(1, "#fc0a0a");

      if (!rimLightRef.current) {
        ctx.shadowColor = "#ffae00";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      const x = center + radius * Math.cos(startAngle);
      const y = center + radius * Math.sin(startAngle);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore(); //Revert
      ctx.save();

      //Write text
      ctx.translate(center, center);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      const text = s.length > 10 ? `${s.slice(0, 10)}...` : s;
      ctx.fillText(text, radius - 20, 5);
      ctx.restore(); //Revert
    });
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffd375";
    ctx.arc(center, center, radius - 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center, center, radius + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }, []);

  useEffect(() => {
    let interVal: ReturnType<typeof setInterval>;

    if (refReady) {
      if (wheelColorRef.current.length === wheelData.length) {
        const newColor = getRandomColor([
          wheelColorRef.current[wheelColorRef.current.length - 1],
          wheelColorRef.current[0],
        ]);
        wheelColorRef.current = wheelColorRef.current.concat(newColor);
      }

      if (wheelState !== "spinning") {
        interVal = setInterval(() => {
          rimLightRef.current = !rimLightRef.current;
          drawWheel(wheelData, angle);
        }, 350);
      } else {
        rimLightRef.current = false;
        drawWheel(wheelData, angle);
      }
    }

    return () => {
      clearInterval(interVal);
    };
  }, [angle, wheelData, wheelState, refReady, drawWheel]);

  useEffect(() => {
    if (wheelState === "spinning") {
      const sectionDegree = 360 / wheelData.length;
      const selectedIndex = Math.floor(Math.random() * wheelData.length);

      let targetDegree =
        360 - (selectedIndex * sectionDegree + sectionDegree / 2);

      if (targetDegree < 0) {
        targetDegree += 360;
      }

      const targetRotation = 360 * 6 + targetDegree;
      const duration = 3000; // ms
      const start = performance.now();

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const newAngle = (targetRotation * easedProgress * Math.PI) / 180;
        setAngle(newAngle);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setWheelState("stopped");
          setSelectedIndex(selectedIndex);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [wheelState, setSelectedIndex, wheelData, setWheelState]);

  useGSAP(
    () => {
      if (canvasRef.current) {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            canvasRef.current,
            {
              scale: 0,
            },
            {
              scale: 0.75,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                scroller: ".playgroundContainer",
                trigger: canvasRef.current,
                start: "top 90%",
                end: "top 50%",
                toggleActions: "play none none none",
              },
            },
          );
        });
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            canvasRef.current,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                scroller: ".playgroundContainer",
                trigger: canvasRef.current,
                start: "top 90%",
                end: "top 50%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }
    },
    {
      dependencies: [],
    },
  );

  return (
    <canvas ref={setRef} className="scale-75 rounded-full bg-neutral-950 p-2" />
  );
};

export default WheelCanvas;
