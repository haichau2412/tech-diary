import Image from "next/image";
import criminalPic from "@/assets/human.png";

const Info = () => {
  return (
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
  );
};

export default Info;
