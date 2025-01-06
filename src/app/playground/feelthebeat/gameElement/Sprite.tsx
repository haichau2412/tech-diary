"use client";

import { useEffect } from "react";
import image from "./Run.png";
import image2 from "./Run2.png";
import CanvasCharacter from "../gameLogic/CanvasCharacter";

interface Props {
  ctx: CanvasRenderingContext2D;
  position: {
    x: number;
    y: number;
  };
  imgNum: number;
}

const Sprite = ({ ctx, position, imgNum = 1 }: Props) => {
  useEffect(() => {
    let maxFrames = 8;
    const img = new Image();
    if (imgNum === 1) {
      img.src = image.src;
    } else {
      maxFrames = 7;
      img.src = image2.src;
    }
    let animatioHandler: ReturnType<typeof requestAnimationFrame>;

    img.onload = function () {
      const character = new CanvasCharacter({
        img,
        drawLocation: position,
        width: img.width,
        height: img.height,
        ctx,
        maxFrames,
      });

      const fps = 12;
      const frameDuration = 1000 / fps;
      let lastTime = 0;
      let index = 0;

      const animate = (timestamp: number) => {
        const deltaTime = timestamp - lastTime;

        if (deltaTime >= frameDuration) {
          if (index === 7) {
            index = 0;
          } else {
            index += 1;
          }

          character.draw(index);
          lastTime = timestamp;
        }

        animatioHandler = window.requestAnimationFrame(animate);
      };

      window.requestAnimationFrame(animate);
    };

    return () => {
      window.cancelAnimationFrame(animatioHandler);
    };
  }, [ctx, imgNum, position]);

  return null;
};

export default Sprite;
