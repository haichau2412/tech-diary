import { useEffect } from "react";
// import start_1 from "./gameElement/start_1.png";
// import start_2 from "./gameElement/start_2.png";
// import start_3 from "./gameElement/start_3.png";
// import start_4 from "./gameElement/start_4.png";
import city1 from "./gameElement/city1.png";
import city2 from "./gameElement/city2.png";
import city3 from "./gameElement/city3.png";
import city4 from "./gameElement/city4.png";
import city5 from "./gameElement/city5.png";
import type { StaticImageData } from "next/image";
import { memo } from "react";

const loadImage = (imgSrc: StaticImageData) => {
  return new Promise(
    (r: (value: HTMLImageElement | PromiseLike<HTMLImageElement>) => void) => {
      const img = new Image();
      img.src = imgSrc.src;
      img.onload = () => {
        r(img);
      };
    },
  );
};

interface LayerImg_Type {
  speed: number;
  img: HTMLImageElement;
}

class LayerImage {
  xPosition: number[] = [];
  img: LayerImg_Type[] = [];
  width: number = 0;
  height: number = 0;

  constructor(props: LayerImg_Type[], width: number, height: number) {
    this.img = props;
    this.width = width;
    this.height = height;
    this.xPosition = new Array(props.length).fill(0);
  }

  calculateNextFrame = () => {
    this.xPosition = this.img.map(({ speed }, index) => {
      const delta = this.width / speed;
      const nextX = this.xPosition[index] - delta;

      if (nextX <= -this.width) {
        return nextX + this.width;
      }
      return nextX;
    });
  };
}

interface Props {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

const GameStartCanvas = memo(function GameStartCanvas({
  ctx,
  width,
  height,
}: Props) {
  useEffect(() => {
    let animatioHandler: ReturnType<typeof requestAnimationFrame>;

    const drawGameStart = async () => {
      //   const img = await Promise.all([
      //     loadImage(start_2),
      //     loadImage(start_3),
      //     loadImage(start_4),
      //     loadImage(start_1), //bg
      //   ]);
      //   const bgImgCalculator = new LayerImage(
      //     [
      //       {
      //         img: img[0],
      //         speed: 1000,
      //       },
      //       {
      //         img: img[1],
      //         speed: 600,
      //       },
      //       {
      //         img: img[2],
      //         speed: 240,
      //       },
      //     ],
      //     width,
      //     height,
      //   );
      const img = await Promise.all([
        loadImage(city2),
        loadImage(city3),
        loadImage(city4),
        loadImage(city5),
        loadImage(city1), //bg
      ]);
      const bgImgCalculator = new LayerImage(
        [
          {
            img: img[0],
            speed: 1000,
          },
          {
            img: img[1],
            speed: 720,
          },
          {
            img: img[2],
            speed: 360,
          },
          {
            img: img[3],
            speed: 240,
          },
        ],
        width,
        height,
      );
      const ratio = Math.ceil(width / img[0].width);

      const drawImage = (img: HTMLImageElement, x: number, y: number) => {
        ctx.drawImage(img, x, y, width, height);
      };

      const drawPaternXImg = (img: HTMLImageElement, x: number) => {
        for (let i = 0; i < ratio; i += 1) {
          drawImage(img, x + width * i, 0);
        }
      };

      const fps = 24;
      const frameDuration = 1000 / fps;
      let lastTime = 0;

      const animate = (timestamp = 0) => {
        const deltaTime = timestamp - lastTime;

        if (deltaTime >= frameDuration) {
          ctx.fillStyle = "black";
          ctx.clearRect(0, 0, width, height);
          drawImage(img[img.length - 1], 0, 0);
          bgImgCalculator.img.forEach(({ img }, index) => {
            drawPaternXImg(img, bgImgCalculator.xPosition[index]);
          });

          bgImgCalculator.calculateNextFrame();

          lastTime = timestamp;
        }

        animatioHandler = window.requestAnimationFrame(animate);
      };

      animate();
    };

    drawGameStart();

    return () => {
      window.cancelAnimationFrame(animatioHandler);
    };
  }, [ctx, width, height]);

  return null;
});

export default GameStartCanvas;
