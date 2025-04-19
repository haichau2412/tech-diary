import React from "react";
import AutoCarousel from "../Carousel";

const Intro = () => {
  return (
    <article className="px-8">
      <div className="flex flex-col items-center border-4 border-green-950 bg-green-200 pb-10">
        <h1 className="absolute left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 rounded-xs bg-green-950 px-3 py-2 text-6xl font-extrabold text-white uppercase">
          Playground!
        </h1>
        <AutoCarousel />
        <div className="max-w-[1080px] px-15 text-center text-3xl text-green-950">
          <p>
            This is my little corner of the web where I create interactive mini
            interactive widget and test out fun ideas. It&apos;s a space for
            creativity, chill vibes, and post-work game sessions. You&apos;re
            invited to join me—just wander around the site and try out whatever
            catches your eye.
          </p>
          <p className="font-bold">Just scroll down and find out what I did!</p>
        </div>
        <div></div>
      </div>
    </article>
  );
};

export default Intro;
