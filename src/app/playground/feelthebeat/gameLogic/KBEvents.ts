import EventEmitter from "events";

export type KeyboardEventType =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Escape";

class KBEvents extends EventEmitter {
  constructor() {
    super();
  }

  emit(event: KeyboardEventType): boolean {
    return super.emit(event);
  }

  on(event: KeyboardEventType, listener: () => void): this {
    return super.on(event, listener);
  }

  _keyHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "Escape":
        console.log("key pressed: ", event.key);
        this.emit(event.key as KeyboardEventType);
        break;
      default:
        break;
    }
  };

  init = () => {
    window.addEventListener("keydown", this._keyHandler);
  };

  clear = () => {
    window.addEventListener("keydown", this._keyHandler);
    this.removeAllListeners();
  };
}

const defaultExport = new KBEvents();

export default defaultExport;
