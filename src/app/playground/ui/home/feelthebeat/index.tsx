"use client";
import { Pixelify_Sans } from "next/font/google";
import "./beat.css";
import { useState, useRef, useEffect } from "react";
// import Sprite from "./gameElement/Sprite";
import KBEvents from "./gameLogic/KBEvents";
import GameStartCanvas from "./GameStart";
import StartGameMenu from "./StartGameMenu";
import StartAudioNode from "./StartAudioNode";
import Store from "./Store";
import RotateH2 from "../shared/RotateH2";

const font = Pixelify_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [refReady, setRefReady] = useState(false);
  const [showStore, _setShowStore] = useState(false);

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
    <article className={`${font.className} px-8 text-lg`}>
      <div className="border-4 border-t-0 border-green-950 py-5">
        <RotateH2
          scrollerClass=".playgroundContainer"
          text="Feel The Beat (WIP)"
          additionalStyle="bg-blue-950 mx-auto mb-2"
        />
        <div className="beat relative mx-auto">
          <div className="relative overflow-hidden rounded-lg border-2 border-blue-900 p-2">
            <canvas className="rounded-md bg-white" ref={setRef}>
              {ctxRef.current && refReady && (
                <>
                  <GameStartCanvas
                    ctx={ctxRef.current}
                    width={canvasRef.current?.width || 1024}
                    height={canvasRef.current?.height || 576}
                  />
                </>
              )}
            </canvas>
            <StartAudioNode />
            <Store show={showStore} />
            <StartGameMenu
              onStoreClick={() => {
                // setShowStore(true);
              }}
            />
          </div>
        </div>
        <footer className="mt-5 text-center">
          <p>&copy; 2024 Feel The Beat. All rights reserved.</p>
        </footer>
      </div>
    </article>
  );
};

export default Game;
