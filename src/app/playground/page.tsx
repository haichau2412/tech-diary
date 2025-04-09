"use client";
import { Rye } from "next/font/google";

const rye = Rye({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const Home = () => {
  return (
    <div className={`flex h-full flex-col items-center justify-center`}>
      <div className="customScrollBarGreen h-full w-full overflow-x-hidden overflow-y-scroll bg-green-50 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 20"
          className={`${rye.className} animate-fade-out mt-20 h-[200px] w-full translate-y-[20px] [animation-range:0px_300px] [animation-timeline:scroll()]`}
        >
          <path
            id="curve"
            d="M 0 20 Q 60 -10 120 20"
            fill="none"
            stroke="none"
            strokeMiterlimit="10"
          />
          <text textAnchor="middle">
            <textPath
              href="#curve"
              startOffset="50%"
              letterSpacing=".05em"
              className="fill-green-800 text-[7px] sm:text-[6px]"
            >
              Welcome to the playground
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Home;
