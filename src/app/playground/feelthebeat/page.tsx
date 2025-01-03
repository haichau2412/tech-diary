"use client";

import "./beat.css";
import { useState, useRef } from "react";
import Sprite from "./gameElement/Sprite";

const TicTacToe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [refReady, setRefReady] = useState(false);

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
      <h1>A rythm game</h1>
      <canvas ref={setRef}></canvas>
      {ctxRef.current && refReady && (
        <>
          <Sprite ctx={ctxRef.current} position={{ x: 10, y: 10 }} />
          <Sprite ctx={ctxRef.current} position={{ x: 100, y: 100 }} />
        </>
      )}
    </div>
  );
};

export default TicTacToe;
