import { Cinzel } from "next/font/google";
import Image from "next/image";
import criminalPic from "../assets/human.png";

const anton = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "900", "700"],
});

export default function WantedBanner() {
  return (
    <div
      className={`${anton.className} border-r border-solid border-black px-2`}
    >
      <div className="mb-4 flex h-full flex-col bg-[#faedda] p-2">
        <div className="text-center text-4xl font-black uppercase leading-normal">
          Wanted
        </div>
        <Image
          priority={false}
          className="mx-auto"
          src={criminalPic}
          width={150}
          height={"auto"}
          alt="Developer's potrait"
        />
        <div className="text-center text-2xl font-bold uppercase">
          Chau Hai Luu
        </div>
        <div className="text-center">
          Reward: <span className="font-bold"> A clean codebase</span>
        </div>
        <div className="mt-2">Crimes he mastered:</div>
        <ul className="ml-2 text-sm font-bold">
          <li className="starAfter">JS, TS</li>
          <li>React</li>
          <li>HTML, SCSS, TailwindsCSS</li>
          <li className="text-xs">
            Occasionally skip testing as he codes like a wizard
          </li>
        </ul>
        <div className="mt-2">Last seen:</div>
        <p className="ml-2 text-sm font-bold">Was trying to put Next.JS & Tailwind to his back poclet</p>
        <div className="mb-0 flex flex-grow items-end justify-center gap-1 py-1">
          <a className="github socialLink">Github</a>
          <a className="linkedIn socialLink">Linkedin</a>
        </div>
      </div>
    </div>
  );
}
