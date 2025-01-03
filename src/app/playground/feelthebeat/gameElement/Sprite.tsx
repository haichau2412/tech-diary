"use client";

import { useEffect } from "react";
import image from "./Run.png";
import image2 from "./Run2.png";

interface Props {
  ctx: CanvasRenderingContext2D;
  position: {
    x: number;
    y: number;
  };
  imgNum: number;
}

const Sprite = ({ ctx, position, imgNum = 1 }: Props) => {
  const draw = (img: CanvasImageSource, index: number) => {
    if (!img) return;

    ctx.fillStyle = "black";
    ctx.fillRect(position.x, position.y, image.width / 4, image.height * 2);

    ctx.drawImage(
      img,
      index * (image.width / 8),
      0,
      image.width / 8,
      image.height,
      position.x,
      position.y,
      image.width / 4,
      image.height * 2,
    );
  };

  useEffect(() => {
    const img = new Image();
    if (imgNum === 1) {
      img.src = image.src;
    } else {
      img.src = image2.src;
    }

    const fps = 12;
    const frameDuration = 1000 / fps;
    let lastTime = 0;
    let index = 0;

    let animatioHandler: ReturnType<typeof requestAnimationFrame>;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= frameDuration) {
        if (index === 7) {
          index = 0;
        } else {
          index += 1;
        }

        draw(img, index);
        lastTime = timestamp;
      }

      animatioHandler = window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animatioHandler);
    };
  }, [ctx]);

  return null;
};

export default Sprite;
