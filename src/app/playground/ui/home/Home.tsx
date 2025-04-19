"use client";
import React from "react";
import gsap from "gsap";
import Intro from "./play/Intro";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Wheel from "./play/wheel";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ onLoad }: { onLoad: () => void }) => {
  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className="customScrollBar green relative flex grow flex-col overflow-x-hidden overflow-y-auto">
      <main className="grow">
        <div className="mx-auto mt-10 max-w-[1600px]">
          <Intro />
          <Wheel />
        </div>
      </main>
    </div>
  );
};

export default Home;
