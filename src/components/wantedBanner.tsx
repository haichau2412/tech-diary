import { Cinzel } from "next/font/google";
import Image from "next/image";
import criminalPic from "@/assets/human.png";

const anton = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "900", "700"],
});

export default function WantedBanner() {
  return (
    <div
      className={`${anton.className} wantedContainer mx-2 flex flex-col items-center justify-center p-2`}
    >
      <div className="text-center text-4xl font-black uppercase leading-tight">
        Wanted
      </div>
      <Image
        role="presentation"
        priority={false}
        className="mx-auto"
        src={criminalPic}
        width={150}
        alt="Developer's potrait"
      />
      <p className="text-center text-2xl font-bold uppercase">Chau Hai Luu</p>
      <div>
        <span className="text-center">Reward:</span>
        <span className="font-bold"> A clean codebase</span>
      </div>
      <div className="mt-2">Crimes he mastered:</div>
      <ul className="ml-2 flex flex-col items-center text-sm font-bold">
        <li className="starAfter">JS, TS</li>
        <li>React</li>
        <li>HTML, SCSS, TailwindCSS</li>
        <li>NextJS</li>
        <li>NodeJS</li>
        <li className="text-xs text-red-700">
          ! Occasionally skip testing as he codes like a wizard
        </li>
      </ul>
      <p className="mt-2">Last seen:</p>
      <p className="ml-2 text-sm font-bold">
        Was trying to put Next.JS & Tailwind to his back poclet
      </p>
      <div>
        <p className="inline">Conviction for his criminal: </p>
        <div className="mb-0 inline-flex items-end justify-center gap-1 py-1 font-bold">
          <a className="github socialLink">Github</a>
          <a className="linkedIn socialLink">Linkedin</a>
        </div>
      </div>
    </div>
  );
}
