import React from "react";

export default function PlaygroundIntro() {
  return (
    <div>
      <h2 className="bg-gradient-to-tl from-green-700 to-violet-950 bg-clip-text text-6xl font-bold text-transparent uppercase">
        My Playground
      </h2>
      <p className="playgroundText top-[50px] mt-[50px] [animation-range:0px_200px]">
        Here at ChauTechDiary, I am building a playground for myself to test out
        new features and ideas. These projects are not meant to be perfect, but
        they are meant to be a learning experience. I hope you enjoy your stay
        here.
      </p>

      <div className="h-[500px]"></div>
      <p className="playgroundText top-[200px] [animation-range:200px_500px]">
        If you are interested in the code, and want me to become a coding
        partner, you can contact me{" "}
        <a
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/chau-luu-0a3378179/"
          className="lack cursor-pointer text-white underline"
        >
          Linkedin
        </a>
        .
      </p>
      <div className="h-[500px]"></div>
      <p className="playgroundText top-[300px] [animation-range:800px_1000px]">
        Now, let&apos;s see what &quot;Games&quot; we have here.
      </p>

      <div className="h-[400px]"></div>
    </div>
  );
}
