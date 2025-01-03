"use client";

import { useEffect } from "react";

interface Props {
  ctx: CanvasRenderingContext2D;
  position: {
    x: number;
    y: number;
  };
}

const Sprite = ({ ctx, position }: Props) => {
  const draw = () => {
    ctx.fillStyle = "blue";
    ctx.fillRect(position.x, position.y, 10, 20);
  };
  const clear = () => {
    ctx.clearRect(position.x, position.y, 10, 20);
  };

  const draw1 = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(position.x, position.y, 20, 10);
  };

  const clear1 = () => {
    ctx.clearRect(position.x, position.y, 20, 10);
  };

  useEffect(() => {
    const coss = [draw, draw1];
    const clear11 = [clear1, clear];
    const fps = 40;
    const frameDuration = 1000 / fps;
    let lastTime = 0;
    let index = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    interval = setInterval(() => {
      if (index) {
        index = 0;
      } else {
        index = 1;
      }
    }, 500);

    let animatioHandler: ReturnType<typeof requestAnimationFrame>;

    let lastIndex = index;
    let drawed = false;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= frameDuration) {
        lastTime = timestamp;
      }

      animatioHandler = window.requestAnimationFrame(animate);

      if (lastIndex !== index) {
        if (!drawed) {
          lastIndex = index;
          clear11[index]();
          coss[index]();
          drawed = true;
        }
      } else {
        drawed = false;
      }
    };

    window.requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      window.cancelAnimationFrame(animatioHandler);
    };
  }, [ctx]);

  draw();

  return null;
};

export default Sprite;
