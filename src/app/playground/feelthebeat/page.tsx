"use client";

import "./beat.css";
import { useState, useRef, useEffect } from "react";
// import Sprite from "./gameElement/Sprite";
import KBEvents from "./gameLogic/KBEvents";
import GameStartCanvas from "./GameStart";
import StartGameMenu from "./StartGameMenu";
import StartAudioNode from "./StartAudioNode";
const TicTacToe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [refReady, setRefReady] = useState(false);

  useEffect(() => {
    KBEvents.init();
  }, []);

  const setRef = (node: HTMLCanvasElement) => {
    if (canvasRef.current) {
      return;
    }

    canvasRef.current = node;
    ctxRef.current = node.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = 1024 * dpr;
    canvasRef.current.height = 576 * dpr;

    setRefReady(true);
  };

  return (
    <div className="beat">
      <div className="relative rounded-lg border-2 border-white p-2">
        <StartAudioNode />
        <canvas className="rounded-md bg-white" ref={setRef}>
          {ctxRef.current && refReady && (
            <>
              <GameStartCanvas
                ctx={ctxRef.current}
                width={canvasRef.current?.width || 1024}
                height={canvasRef.current?.height || 576}
              />
              {/* <Sprite
                ctx={ctxRef.current}
                position={{ x: 10, y: 10 }}
                imgNum={1}
              />
              <Sprite
                ctx={ctxRef.current}
                position={{ x: 400, y: 10 }}
                imgNum={2}
              /> */}
            </>
          )}
        </canvas>

        <StartGameMenu />
      </div>
    </div>
  );
};

export default TicTacToe;
