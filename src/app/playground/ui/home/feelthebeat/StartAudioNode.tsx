"use client";
import { memo, useRef, useState } from "react";

const StartAudioNode = memo(function AudioNode() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setRef = (node: HTMLAudioElement) => {
    if (audioRef.current) {
      return;
    }
    audioRef.current = node;
    node.volume = 0.4;
    // if (navigator.userActivation.isActive) {
    //   node.play().then(() => {
    //     setIsPlaying(true);
    //   });
    // }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        setIsPlaying(true);
        audioRef.current.play();
      } else {
        setIsPlaying(false);
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="absolute top-0 right-[50px]">
      <button onClick={togglePlay}>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            className={`absolute fill-slate-100 ${isPlaying ? "animate-shaking" : ""}`}
          >
            <path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            className={`absolute ${isPlaying ? "fill-none" : "fill-slate-900"}`}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      </button>
      <audio ref={setRef} src="/startMusic.mp3" loop />
    </div>
  );
});
export default StartAudioNode;
