import { CharacterInterface } from "./Character";

interface CanvasProps {
  img: CanvasImageSource;
  drawLocation: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  maxFrames: number;
}

class CanvasCharacter implements CharacterInterface {
  img: CanvasImageSource;
  drawLocation: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  maxFrames: number;

  constructor(props: CanvasProps) {
    this.img = props.img;
    this.drawLocation = props.drawLocation;
    this.width = props.width;
    this.height = props.height;
    this.ctx = props.ctx;
    this.maxFrames = props.maxFrames;
  }

  draw(frameIndex: number) {
    if (!this.img) return;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.drawLocation.x,
      this.drawLocation.y,
      this.width / 4,
      this.height * 2,
    );

    this.ctx.drawImage(
      this.img,
      frameIndex * (this.width / this.maxFrames),
      0,
      this.width / this.maxFrames,
      this.height,
      this.drawLocation.x,
      this.drawLocation.y,
      this.width / this.maxFrames,
      this.height,
    );
  }

  moveUp() {}

  moveDown() {}

  moveLeft() {}

  moveRight() {}

  idle() {}

  lose() {}

  win() {}
}

export default CanvasCharacter;
