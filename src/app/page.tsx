import { Rye } from "next/font/google";
// import { useScroll, motion } from "motion/react";
// import { useRef } from "react";
import Info from "./ui/intro/Info";

const rye = Rye({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// const updateStatus = async (userId: string, online: boolean) => {

const Home = () => {
  // const carouselRef = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   container: carouselRef,
  // });

  return (
    <div className={`flex h-full flex-col items-center justify-center`}>
      <div
        // ref={carouselRef}
        className="customScrollBarGreen h-full w-full overflow-x-hidden overflow-y-scroll bg-neutral-950 text-center"
      >
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
              className="fill-gray-100 text-[7px] sm:text-[6px]"
            >
              Welcome to my portfolio
            </textPath>
          </text>
        </svg>
        {/* <div className="sticky top-0 z-50 flex justify-center">
          <svg id="progress" width="50" height="50" viewBox="0 0 50 50">
            <circle
              className="stroke-gray-300"
              strokeDashoffset={0}
              cx="25"
              cy="25"
              r="20"
              strokeWidth={5}
              fill="none"
            />
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              className="stroke-green-700"
              strokeWidth={5}
              strokeDasharray="0 1px"
              fill={"none"}
              strokeDashoffset={0}
              pathLength={1}
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform fill-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
          </svg>
        </div> */}
        <Info />
        <p className="playgroundText top-[50px] mt-[50px] [animation-range:0px_400px]">
          Here at ChauTechDiary, I am building a playground for myself to test
          out new features and ideas. These projects are not meant to be
          perfect, but they are meant to be a learning experience. I hope you
          enjoy your stay here.
        </p>

        <div className="h-[500px]"></div>
        <p className="playgroundText top-[200px] [animation-range:200px_500px]">
          If you are interested in the code, and want me to become a coding
          partner, you can contact me{" "}
          <a
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/in/chau-luu-0a3378179/"
            className="lack text-white hover:underline"
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
    </div>
  );
};

export default Home;
