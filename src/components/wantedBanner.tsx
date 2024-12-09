import { Cinzel } from "next/font/google";
import Image from "next/image";
import criminalPic from "@/assets/human.png";

const anton = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "900", "700"],
});

export default function WantedBanner() {
  return (
    <div className="grid h-full place-items-center">
      <div
        className={`${anton.className} wantedContainer mx-2 flex flex-col items-center justify-center px-5 py-3`}
      >
        <div className="starAfter text-center text-6xl font-black uppercase leading-none sm:text-8xl">
          Wanted
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex flex-col justify-between">
            <Image
              role="presentation"
              priority={false}
              className="mx-auto"
              src={criminalPic}
              width={150}
              alt="Developer's potrait"
            />
            <p className="mt-2 text-center text-xl font-bold uppercase sm:text-2xl">
              Chau Hai Luu
            </p>
          </div>
          <div className="flex flex-col items-center text-center text-sm sm:text-base">
            <p className="text-base">Crimes he mastered:</p>
            <ul className="ml-2 flex flex-col items-center font-bold">
              <li>JS, TS</li>
              <li>React</li>
              <li>HTML, SCSS, TailwindCSS</li>
              <li>NextJS</li>
              <li>NodeJS</li>
              <li className="text-xs text-red-700">
                ! He Occasionally skip testing as he codes like a wizard
              </li>
            </ul>
            <p className="mt-2 text-base">Last seen:</p>
            <p className="ml-2 font-bold">
              Was trying to put Next.JS & Deno to his back pocket
            </p>
          </div>
        </div>
        <div className="mt-3">
          <span>Reward:</span>
          <span className="font-bold sm:text-xl"> A clean codebase</span>
        </div>

        <div className="flex flex-col items-center sm:flex-row">
          <p>Conviction for his criminal: </p>
          <div className="ml-1 flex justify-center gap-1 font-bold sm:text-xl">
            <a className="github socialLink">Github</a>
            <a className="linkedIn socialLink">Linkedin</a>
          </div>
        </div>
      </div>
    </div>
  );
}
