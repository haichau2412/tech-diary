import Image from "next/image";
import criminalPic from "@/assets/human.png";

const TechTag = ({ text }: { text: string }) => {
  return (
    <span className="mx-1 inline-block cursor-default rounded-sm bg-amber-50 px-0.5 text-center text-xs text-gray-900 md:px-1 md:py-0.5 lg:text-sm">
      {text}
    </span>
  );
};

const CORE = ["ReactJS", "NextJS", "Vanilla JS", "Typescript"];

const LIB = ["Tailwind CSS", "Tanstack-query"];
const BACKEND_CORE = ["Express"];
const TOPIC = [
  "Service worker",
  "RESTful API",
  "WCAG",
  "Optimization",
  "Testing",
  "Web worker",
];
const LEARNING_PLAN = ["Effect-TS", "AWS", "GraphQL", "Material-UI"];

const Info = () => {
  return (
    <div className="relative mx-auto mt-2.5 flex w-3/4 flex-col overflow-hidden rounded-xs bg-gradient-to-tl from-violet-950 to-green-700 p-2.5 px-5 md:text-lg">
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="flex flex-col justify-between text-right text-stone-300 lg:border-r-2 lg:border-r-stone-300 lg:pr-2.5">
          <div className="pl-[150px]">
            <p className="inline-block">
              Hi, I am a frontend developer, who loves to create useful and
              creative websites, on my journey to become a fullstack developer.
              In my perspective, a website should be esthetical to the eyes
              while serving its greatest purpose: cater to the users&apos;
              needs.
            </p>
            <p>A team player, a friend in disguise.</p>
          </div>

          <h2 className="relative mt-[60px] rounded-md text-left text-8xl leading-none font-bold uppercase sm:mt-[50px] sm:leading-tight sm:tracking-wide">
            Chau Hai Luu
            <div className="absolute -top-[40px] left-[120px] sm:-top-[50px]">
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
          </h2>
        </div>
        <div className="text-stone-100 lg:basis-[1000px]">
          <h2 className="text-8xl font-bold uppercase">My skills</h2>
          <ul className="flex flex-col items-start text-start">
            <li>
              Core:
              {CORE.map((t, i) => (
                <TechTag key={i} text={t} />
              ))}
            </li>
            <li>
              Backend:{" "}
              {BACKEND_CORE.map((t, i) => (
                <TechTag key={i} text={t} />
              ))}
            </li>
            <li>
              Used library:{" "}
              {LIB.map((t, i) => (
                <TechTag key={i} text={t} />
              ))}
            </li>
            <li>
              Familiar topic:{" "}
              {TOPIC.map((t, i) => (
                <TechTag key={i} text={t} />
              ))}
            </li>

            <li>
              Learning techs:{" "}
              {LEARNING_PLAN.map((t, i) => (
                <TechTag key={i} text={t} />
              ))}
            </li>
            <li>Advanced English level in Reading/Listening</li>
            <li>Upper-intermediate English level in Speaking/Writing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
