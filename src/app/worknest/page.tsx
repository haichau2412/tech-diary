"use client";
import React from "react";
import { usePageTransition } from "../shared/transition/transitionContext";
import WorknestNav from "./ui/home/Nav";
import HomeFooter from "../ui/footer";

const Page = () => {
  const { setShow } = usePageTransition();

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 200);
  }, [setShow]);

  return (
    <div className="customScrollBar green relative flex grow flex-col overflow-x-hidden overflow-y-auto bg-orange-100">
      <main className="grow">
        <h2 className="mt-5 text-center text-4xl font-extrabold text-gray-900 uppercase md:text-6xl">
          Worknest
        </h2>
        <p className="px-10 text-center text-lg font-semibold text-gray-900 italic">
          Worknest is a personal project that I am working on. It is a
          collection of various tools and utilities that I have created to help
          me with my work and personal life.
        </p>

        <p className="mx-auto w-fit bg-black p-5 py-1 text-center text-white">
          Looking for a portfolio? The code for this website is open source.
          {"  "}
          <a
            href="https://github.com/haichau2412/tech-diary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="text-orange-700 underline hover:text-orange-900"
          >
            View on Github
          </a>
        </p>

        <WorknestNav />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Page;
