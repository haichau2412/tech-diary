import SectionContainer from "./SectionContainer";
import Image from "next/image";
import criminalPic from "@/assets/human.png";
import React from "react";

const TechTag = ({ text }: { text: string }) => {
  return (
    <span className="mx-1 inline-block cursor-default rounded-sm bg-amber-50 px-0.5 text-center text-xs text-gray-900 md:px-1 md:py-0.5 lg:text-sm">
      {text}
    </span>
  );
};

const TECH = [
  {
    title: "Frontend",
    tag: [
      "ReactJS",
      "NextJS",
      "Vanilla JS",
      "Typescript",
      "Tailwind CSS",
      "Tanstack-query",
      "Jest",
    ],
  },
  {
    title: "Backend",
    tag: ["Express"],
  },
  {
    title: "Related topics",
    tag: [
      "Service worker",
      "RESTful API",
      "WCAG",
      "Optimization",
      "Testing",
      "Web worker",
      "Git",
    ],
  },
  {
    title: "Learning plan",
    tag: ["Effect-TS", "AWS", "GraphQL", "Material-UI"],
  },
];

const Introduction = () => {
  return (
    <div>
      <SectionContainer
        title="About me"
        subTitle="Employment identification card"
        additionalStyle="lg:w-[400px] mx-auto "
      >
        <div>
          <div className="flex flex-col gap-2.5 rounded-t-md bg-gradient-to-tl from-violet-950 to-green-700 p-2.5 px-5">
            <div className="relative flex flex-col justify-between text-right text-stone-300">
              <div className="pl-[150px]">
                <p className="inline-block">
                  I write things in JS and TS, and love what I do.
                </p>
              </div>
              <h2 className="relative rounded-md text-xl leading-none font-bold tracking-wide uppercase">
                Chau Hai Luu
              </h2>
              <div className="absolute -top-[0px] left-[10px]">
                <div className="relative aspect-[370/470] w-[70px] shadow-lg shadow-blue-500">
                  <Image
                    priority={false}
                    className="bg-slate-400"
                    src={criminalPic}
                    fill={true}
                    alt="Developer's potrait"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`customScrollBarGreen overflow-y-scroll bg-neutral-900`}
          >
            <div className="p-3 px-5 text-center">
              <div className="text-stone-100">
                <p className="text-6xl font-bold uppercase">My skills</p>
                <ul className="mt-3 flex flex-col items-start text-start">
                  {TECH.map(({ title, tag }) => (
                    <li className="mt-2 first:mt-0" key={title}>
                      <p>
                        {title}:{" "}
                        {tag.map((t, i) => (
                          <TechTag key={i} text={t} />
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Introduction;
